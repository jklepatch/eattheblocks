import { connect, Poll } from '../../lib/db.js';

export default async (req, res) => {
  await connect();
  try {
    const polls = await Poll
      .find()
      .sort({end : -1})
      .limit(1)
    if(polls.length === 0) {
      res
        .status(404)
        .json({ 
          error: 'Not poll found'
        });
      return;
    }
    res
      .status(200)
      .json({ poll: polls[0] });
  } catch(e) {
    res
      .status(500)
      .json({ 
        error: 'internal server error'
      });
  }
};
