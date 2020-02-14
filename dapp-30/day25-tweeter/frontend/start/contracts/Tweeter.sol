pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

//1. Send tweet
//2. Send private messages
//3. Follow other people
//4. Get list of tweets
//5. Implement an API
contract Tweeter {
    struct Tweet {
        uint id;
        address author;
        string content;
        uint createdAt;
    }
    
    struct Message {
        uint id;
        string content;
        address from;
        address to;
        uint createdAt;
    }
    mapping(uint => Tweet) private tweets;
    mapping(address => uint[]) private tweetsOf;
    mapping(uint => Message[]) private conversations;
    mapping(address => address[]) public following;
    mapping(address => mapping(address => bool)) private operators;
    uint private nextTweetId;
    uint private nextMessageId;
    
    event TweetSent (
        uint id,
        address indexed author,
        string content,
        uint createdAt
    );
    
    event MessageSent(
        uint id,
        string content,
        address indexed from,
        address indexed to,
        uint createdAt
    );
    
    function tweet(string calldata _content) external {
        _tweet(msg.sender, _content);
    }
    
    function tweetFrom(address _from, string calldata _content) external {
        _tweet(_from, _content);
    }
    
    function sendMessage(
        string calldata _content,
        address _to)
        external {
         _sendMessage(_content, msg.sender, _to);  
    }
    
    function sendMessageFrom(
        string calldata _content,
        address _from,
        address _to)
        external {
        _sendMessage(_content, _from, _to);    
    }
    
    function follow(address _followed) external {
        following[msg.sender].push(_followed);
    }

    function allow(address _operator) external {
      operators[msg.sender][_operator] = true;
    }

    function disallow(address _operator) external {
      operators[msg.sender][_operator] = false;
    }
    
    function getLatestTweets(uint count) view external returns(Tweet[] memory) {
        require(count > 0 && count <= nextTweetId, 'Too few or too many tweets to return');
        Tweet[] memory _tweets = new Tweet[](count);
        uint j; //This was missing in original smart contract
        for(uint i = nextTweetId - count; i < nextTweetId; i++) {
            Tweet storage _tweet = tweets[i];
            _tweets[j] = Tweet(
                _tweet.id, 
                _tweet.author, 
                _tweet.content, 
                _tweet.createdAt
            );
            j += 1;
        }
        return _tweets;
    }
    
    function getTweetsOf(address _user, uint count) 
      view 
      external 
      returns(Tweet[] memory) {
        uint[] storage tweetIds = tweetsOf[_user];
        require(count > 0 && count <= tweetIds.length, 'Too few or too many tweets to return');
        Tweet[] memory _tweets = new Tweet[](count);
        uint j; //This was missing in original smart contract
        for(uint i = tweetIds.length - count; i < tweetIds.length; i++) {
          Tweet storage _tweet = tweets[tweetIds[i]];
          _tweets[j] = Tweet(
              _tweet.id, 
              _tweet.author, 
              _tweet.content, 
              _tweet.createdAt
          );
          j += 1;
        }
        return _tweets;
    }
    
    function _tweet(
        address _from, 
        string memory _content) 
        internal
        canOperate(_from) {
        tweets[nextTweetId] = Tweet(nextTweetId, _from, _content, now);
        tweetsOf[_from].push(nextTweetId);
        emit TweetSent(nextTweetId, _from, _content, now);
        nextTweetId++;
    }
        
    function _sendMessage(
        string memory _content,
        address _from,
        address _to)
        internal
        canOperate(_from) {
        uint conversationId = uint(_from) + uint(_to);
        conversations[conversationId].push(Message(
            nextMessageId, 
            _content, 
            _from,
            _to, 
            now)
        );
        emit MessageSent(nextMessageId, _content, _from, _to, now);
        nextMessageId++;  
    }
    
    modifier canOperate(address _from) {
        require(
          operators[_from][msg.sender] == true || msg.sender == _from, 
          'Operator not authorized');
        _;
    }
    
}
