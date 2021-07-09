## Description

We will build a voting app to vote on the ETB projects to build in the future. The voting is based on the ETB tokens:
* This is the address of the [ETB token](https://bscscan.com/token/0x7ac64008fa000bfdc4494e0bfcc9f4eff3d51d2a)
* Voting is done off-chain, in order to not cost anything and maximize participation 
* The app hasL 
 * a frontend for users
 * a backend to manage voting in a db 
* To vote, a user needs to sign a message, from the frontend: 
 * The message to sign is: ${poll_id}-{choice_id}
 * The message is signed with Metamask
* The backend checks that:
  * the signature is correct
  * the user (identified by the address) has not already voted
  * how many ETB tokens are owned by this address, the vote is done proportionally
* Data structure for a vote: 
  * Description
  * deadline
  * [Choices]
* Screens (frontend):
  * Screen 1: Users can vote for the next project, as well as see current vote
result
  * Screen 1: When the vote is finished (deadline reached), only result is visible
  * Screen 2: Admin screen, to create new vote
* A skeleton of the project can be found [here](https://github.com/jklepatch/eattheblocks/tree/master/token/dao). You can use this as a base.

Recommended tech:
* Javascript 
* NextJS
* Web3 (not sure Ethers can do signature)
* MongoDB

For more information, you can:
* watch this video
* attend one of the office hours (timetable below)
* Send an email to Julien, julien [at] eattheblocks [dot] com

## Timetable

* Office hours - July 10th 11pm UTC+8 
* Office hours - July 16th 11pm UTC+8
* Office hours - July 23rd 11pm UTC+8
* Deadline for submission - July 29th 11pm UTC+8
* Demo day - July 30th 11pm UTC+8, livestream on Youtube   
* Vote from July 30th to August 6th 11pm UTC+8
* Result on August 6th 11pm UTC+8

## Office hours 
* Office hours will be done on Zoom, Link will be shared on the FB group of ETB, and by email:
  * [Link to FB group](https://www.facebook.com/groups/222716919099261)
  * [By email](https://mailchi.mp/eattheblocks/etb-projects-project-1) 

## Project submission
* For submission, please send an email to julien [at] eattheblocks [dot] com with:
  * a link to a video demo of the app (no need for any fancy editing, just record your screen and explain what's going on)
  * a link to the Github repo of your project

## Prize

The winner of the project will receive 1000 USD

