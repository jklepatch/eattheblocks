## Description

We will build a staking Dapp for the [ETB token](https://bscscan.com/token/0x7ac64008fa000bfdc4494e0bfcc9f4eff3d51d2a):

* By locking ETB in a smart contract, you get a reward in ETB
* Parameters of the reward mechanism are up to suggestion
* What to stake:
  * if ETB tokens itself, it's in competition with liquidity of the Pancakeswap pool
  * LP token of the Pancakeswap pool
* What is the reward:
  * ETB token
  * calculated proportionally to the time you spent in the pool, and your weight in the pool
  * rewards work in phases. We will vote periodically for a new phase of the staking reward. For each phase we will decide the amount of token distributed per day, and the duration
  * These parameters will be controlled by an admin address, controlled by Julien
* Distribution mechanism:
  * Since ETB has a fixed supply, the staking smart contract will have to be pre-funded with ETB tokens by the admin (Julien)
  * Ideally we don't won't to have to triger distributions periodically with a bot
  * It's better if profits are distributed automatically when someone exits the staking contract 

Deliverables:
* Smart contract
* Frontend

Recommended tech:
* Javascript 
* NextJS
* Web3 or Ethers
* Truffle or Hardhat

For more information, you can:
* attend one of the office hours (timetable below)
* Send an email to Julien, julien [at] eattheblocks [dot] com

## Schedule

* Office hours - Aug 20th 11pm UTC+8 
* Office hours - Aug 27th 11pm UTC+8
* Deadline for submission - Sep 2nd midnight UTC+8
* Demo day - Sep 3rd 11pm UTC+8, livestream on Youtube   
* Vote from Sep 3rd to Sep 10th midnight UTC+8

## How to participate?

Everybody can participate. There is no registration. You can start to work on it on your own, or join the [ETB FB group](https://www.facebook.com/groups/222716919099261) to find teammates.

Once the hackathon has started, there are regular office hours (see schedule above), where you can get some guidance from Julien. Links to the Zoom meeting will be given by [email](https://mailchi.mp/eattheblocks/etb-projects).

At the end of the hackathon, you need to submit your project before the deadline (see schedule above). Please send an email to julien [at] eattheblocks [dot] com with:
* a link to a video demo of the app (no need for any fancy editing, just record your screen and explain what's going on)
* a link to the Github repo of your project

If you want to receive updates about the hackathons, you can register to this [mailing list](https://mailchi.mp/eattheblocks/etb-projects) .

## Prize

The winner of the project will receive 500 USD + 500 ETB

