pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

contract Tweeter {
  struct Tweet {
    uint id;
    address author;
    string content;
    uint createdAt;
  }

  struct Message {
    string content;
    uint createdAt;
  }

  mapping(uint => Tweet) private tweets;
  mapping(address => uint[]) private tweetsOf;
  mapping(address => address[]) private following;
  mapping(address => string[]) private conversations;
  mapping(address => mapping(address => bool)) private operators;
  uint private nextId;
  address public admin;

  event TweetSent(
    uint id,
    address indexed _from,
    string content,
    uint date
  );
  event FollowerAdded(
    address indexed _from, 
    address indexed _followed, 
    uint indexed date
  );
  event MessageSent(
    address indexed _from, 
    address indexed _to, 
    string content
  );

  constructor(address _admin) public {
    admin = _admin;
  }

  function tweet(string calldata _content) external {
    _tweet(_content, msg.sender);
  }

  function tweetFrom(string calldata _content, address _from) external {
    _tweet(_content, _from);
  }

  function tweetTo(address _to, string calldata _content) external {
    _tweetTo(_to, _content, msg.sender);
  }

  function tweetToFrom(
    address _to, 
    string calldata _content,
    address _from) 
    external {
    _tweetTo(_to, _content, _from);
  }

  function follow(address _followed) external {
    _follow(_followed, msg.sender);
  }

  function followFrom(address _followed, address _from) external {
    _follow(_followed, _from);
  }

  function getTweetsOf(address author) 
    external 
    view 
    returns(Tweet[] memory) {
    uint[] storage tweetIds = tweetsOf[author];
    Tweet[] memory _tweets = new Tweet[](tweetIds.length);
    for(uint i = 0; i < tweetIds.length; i++) {
      Tweet storage _tweet = tweets[i];
      _tweets[i] = Tweet(
        _tweet.id, 
        _tweet.author, 
        _tweet.content, 
        _tweet.createdAt
      );
    }
    return tweets;
  }

  function getLatestTweets(uint count) 
    external 
    view 
    returns(Tweet[] memory) {
    require(count > 0 && count <= nextId, 'Not enough tweets');
    Tweet[] memory _tweets = new Tweet[](nextId);
    for(uint i = nextId - count; i < nextId; i++) {
      Tweet storage _tweet = tweets[i];
      _tweets[i] = Tweet(
        _tweet.id, 
        _tweet.author, 
        _tweet.content, 
        _tweet.createdAt
      );
    }
    return _tweets;
  } 

  function _tweet(
    string memory _content,
    address _from)
    internal 
    canOperate(_from) {
    tweets[nextId] = Tweet(nextId, _from, _content, now);
    tweetsOf[_from].push(nextId);
    emit TweetSent(nextId, msg.sender, _content, now);    
    nextId++;
  }

  function _tweetTo(
    address _to, 
    string memory _content, 
    address _from) 
    internal 
    canOperate(_from) {
    conversations[_from][_to].push(Message(_content, now));
    emit MessageSent(_from, _to, _content);
  }

  function _follow(
    address _followed, 
    address _from) 
    internal 
    canOperate(_from) {
    following[_to].push(_followed);
    emit FollowerAdded(_from, _followed, now);
  }

  modifier canOperate(address _from) {
    require(msg.sender == _from 
            || operators[_from][msg.sender] == true, 'Cannot operate this account');
    _;
  }
}
