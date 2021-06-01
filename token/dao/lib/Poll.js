import { Pie } from 'react-chartjs-2';

export default function Poll({ poll }) {
  //console.log(poll);
  const names = poll.proposals.map(proposal => proposal.name);
  const totalVotes = poll.proposals.reduce((acc, proposal) => acc + proposal.voteCount, 0);
  const votesRaw = poll.proposals.map(proposal => proposal.voteCount);
  const votesPercentage = poll.proposals.map(proposal => proposal.voteCount / totalVotes);
  const colors = ['#4C5270', '#F652A0', '#36EEE0', '#BCECE0'];

  const data = {
   	labels: names,
   	datasets: [{
   		data: votesRaw, 
      backgroundColor: colors.slice(0, names.length)
   	}]
   };

  return (
    <>
      <div className='row'> 
        <div className='col-sm-12'>
          <h2 className='text-center'>{poll.name}</h2>
          <p className='text-center'>Current Poll result</p>
        </div>
      </div>
      <div className='row'> 
        <div className='col-sm-6'>
          <ul>
            {poll.proposals.map((proposal, i) => (
              <li key={proposal._id}>{proposal.name}: {proposal.voteCount} votes ({votesPercentage[i].toFixed(2)}%)</li>
            ))}
          </ul>
        </div>
        <div className='col-sm-6'>
          <Pie data={data} height={300} width={300} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </>
  );
}
