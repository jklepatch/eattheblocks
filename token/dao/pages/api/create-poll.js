import { connect, Poll } from '../../lib/db.js';

export default async (req, res) => {
  await connect();
  if(req.body.password!== process.env.ADMIN_PASSWORD) {
    console.log('hare');
    res
      .status(401)
      .json({ 
        error: 'Unauthorized access'
      });
    return;
  }
  if(!req.body.name) {
    res
      .status(400)
      .json({ 
        error: 'missing name parameter'
      });
    return;
  }
  if(!req.body.end) {
    res
      .status(400)
      .json({ 
        error: 'missing end parameter'
      });
    return;
  }
  if(!req.body.proposals) {
    res
      .status(400)
      .json({ 
        error: 'missing proposals parameter'
      });
    return;
  }
  const proposalsList = req.body.proposals.split(',');
  const proposals = proposalsList.map(p => ({
    name: p.trim(),
    voteCount: 0
  }));
  const poll = new Poll({
    name: req.body.name,
    end: req.body.end,
    proposals,
    alreadyVoted: [],
  });
  try {
    await poll.save();
    res
      .status(201)
      .json({ 
        result: 'poll created', 
      });
  } catch(e) {
    res
      .status(500)
      .json({ 
        error: 'internal server error'
      });
  }
}
