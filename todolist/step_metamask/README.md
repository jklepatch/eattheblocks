# Step 14 - Metamask integration

## Instructions
1. Run `ganache-cli -d`. The `-d` flag is for "deterministic", meaning truffle will init the blockchain with fixed accounts (usually these are random)
2. Copy the private key of one of the accounts listed
3. Switch the metamask network to "Private". Click "Accounts", then "Import Account". Paste pk in and confirm.
4. Switch to this account. From now on, any transactions you make in dapp will prompt the metamask modal to pop up.

### Notes
`-d` is used to ensure that the same accounts are generated. This is in case you need to restart the truffle instance. Without the flag, random accounts will be created and you'll have to import new pks every time (annoying :P).

Data will not update automatically when transacting through metamask. This bug has been reported [since metamask updated to 4.13](https://github.com/truffle-box/drizzle-box/issues/57).  