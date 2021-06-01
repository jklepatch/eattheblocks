import { connect, Poll } from '../../lib/db.js';

export default async (req, res) => {
  await connect();
  if(!req.body.address) {
    res
      .status(400)
      .json({ 
        error: 'missing address parameter'
      });
    return;
  }
  if(!req.body.pollId) {
    res
      .status(400)
      .json({ 
        error: 'missing pollId parameter'
      });
    return;
  }
  if(!req.body.proposalId) {
    res
      .status(400)
      .json({ 
        error: 'missing proposalId parameter'
      });
    return;
  }
  //console.log(req.body);
  try {
    //findOneAndUpdate({_id: req.body.pollId}, {$inc : {'post.likes' : 1}}).exec(...);
    const poll = await Poll
      .findById(req.body.pollId)
    poll.proposals = poll.proposals.map(proposal => {   
      if(proposal._id.toString() === req.body.proposalId.toString()) {
        return {
          _id: proposal._id, 
          name: proposal.name,
          voteCount: proposal.voteCount + 1 
        };
      } else {
        return proposal;
      }
    });
    poll.alreadyVoted.push(req.body.address);
    await poll.save();
    //console.log(c);
    //console.log(poll);
    res
      .status(200)
      .json({ 
        result: 'ok', 
      });
  } catch(e) {
    console.log(e);
    res
      .status(500)
      .json({ 
        error: 'internal server error'
      });
  }
  //await mongoose.connect(
  //  process.env.DB_URL, 
  //  {
  //    useNewUrlParser: true,
  //    useUnifiedTopology: true
  //  }
  //);
}
