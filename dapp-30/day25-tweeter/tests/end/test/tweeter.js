const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const Tweeter = artifacts.require('Tweeter');

contract('Tweeter', (accounts) => {
  let tweeter = null;
  const user1Tweets = [
    'My first tweet - first user',
    'My second tweet - first user',
    'My third tweet - first user',
  ];
  const user2Tweets = [
    'My first tweet - second user',
    'My second tweet - second user',
    'My third tweet - second user',
  ];
  const [user1, user2] = [accounts[0], accounts[1]];
  beforeEach(async () => {
    tweeter = await Tweeter.new();
    await Promise.all(
      user1Tweets.map(tweet =>
        tweeter.tweet(tweet, {from: user1})
      ),
      user2Tweets.map(tweet =>
        tweeter.tweet(tweet, {from: user2})
      )
    );
  });

  it('should return all tweets of a user', async () => {
    const results = await tweeter.getTweetsOf(user1, 3);
    assert(results.length === 3);
    assert(results[0].author === user1);
    assert(results[0].content === user1Tweets[0]);
  });

  it('should return latest tweets of a user', async () => {
    const results = await tweeter.getTweetsOf(user2, 1);
    assert(results.length === 1);
    assert(results[0].author === user2);
    assert(results[0].content === user2Tweets[2]);
  });

  it('should NOT return latestTweets of user if too many tweets asked', async () => {
    await expectRevert(
      tweeter.getTweetsOf(user2, 10),  
      'Too few or too many tweets to return'
    );
  });

  it('should return latest tweets', async () => {
    const results = await tweeter.getLatestTweets(4);
    assert(results.length === 4);
    assert(results[0].author === user1);
    assert(results[0].content === user1Tweets[2]);
    assert(results[1].author === user2);
    assert(results[1].content === user2Tweets[0]);
    assert(results[2].author === user2);
    assert(results[2].content === user2Tweets[1]);
    assert(results[3].author === user2);
    assert(results[3].content === user2Tweets[2]);
  });

  it('should NOT return latestTweets if too many tweets asked', async () => {
    await expectRevert(
      tweeter.getLatestTweets(10),  
      'Too few or too many tweets to return'
    );
  });

  it('should send tweet', async () => {
    const receipt = await tweeter.tweet('Tweet 1', {from: user1});
    expectEvent(receipt, 'TweetSent', {
      id: web3.utils.toBN(6),
      author: user1,
      content: 'Tweet 1'
    });
  });
  
  it('should send message', async () => {
    const receipt = await tweeter.sendMessage('Message 1', user2, {from: user1});
    expectEvent(receipt, 'MessageSent', {
      id: web3.utils.toBN(0),
      content: 'Message 1',
      from: user1,
      to: user2
    });
  });

  it('should follow', async () => {
    await tweeter.follow(user2, {from: user1});
    const followed1 = await tweeter.following(user1, 0);
    assert(followed1 === user2);
  });

  it('should NOT send a tweet from if not operator', async () => {
    await expectRevert(
      tweeter.tweetFrom(user1, 'Tweet', {from: user2}),
      'Operator not authorized'
    );
  });

  it('should send a tweet from approved operator', async () => {
    await tweeter.allow(user2, {from: user1});
    const receipt = await tweeter.tweetFrom(user1, 'Tweet', {from: user2});
    expectEvent(receipt, 'TweetSent', {
      id: web3.utils.toBN(6),
      author: user1,
      content: 'Tweet'
    });
  });

  it('should NOT send a message from if not operator', async () => {
    await expectRevert(
      tweeter.sendMessageFrom('Message', user1, user2, {from: user2}),
      'Operator not authorized'
    );
  });

  it('should send a message from approved operator', async () => {
    await tweeter.allow(user2, {from: user1});
    const receipt = await tweeter.sendMessageFrom(
      'Message', 
      user1,
      user2, 
      {from: user2}
    );
    expectEvent(receipt, 'MessageSent', {
      id: web3.utils.toBN(0),
      content: 'Message',
      from: user1,
      to: user2
    });
  });
});
