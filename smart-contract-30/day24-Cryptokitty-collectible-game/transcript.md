In this video, we will introduce ERC 721 tokens.

ERC721 tokens are the basis of many gaming Dapp in Ethereum like
cryptokitties.. 
Once you know how ERC721 tokens work, it will be much easier 
to build your game on Ethereum. And that's what we will do in 
the next video. So make sure to follow this video until the end. 

* First, I will give you an overview of ERC721 tokens
* Then, I will introduce you the ERC721 standard
* Finally, we will build a custom implementation

Let's start with an overview of ERC721 tokens

And actually before diving into ERC721 tokens we will take
a step back and remind ourselves what we can do with ERC20 tokens.
With ERC20 tokens, we can represent fungible assets. A fungible
asset is an asset that can exchanged for another one. In the previous
video, I used the example of a dollar bill to illustrate this. If I 
have a one dollar bill, and you also have an one dollar bill, we can
exchange our bills and we will still have the same value. The same
thing happen with an ERC20 token.

However, there are also some assets that can be grouped together, 
but that are not fungibles. For example, in online games like 
world-of-warcraft, you play a character that can fight against other 
characters. Dependending on certain attributes of each character
like strenght or speed, a character has more or less chance of
winning a fight, and becomes more or less valuable. 
That means that even though All the characters in the game belongs 
to the same class of asset, they are not fungibles, or in other terms 
they cannot be exchanged.

ERC721 was created to represent these kinds of non-fungible assets.

More specifically, ERC721 is used mostly in what we call crypto collectible
games like cryptokitties, where players breed virtual kitties, and
can buy or sell them.

Next, we will go through the ERC721 standard.
