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
});
