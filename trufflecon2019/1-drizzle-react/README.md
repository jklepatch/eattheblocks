# Events with Drizzle & React

Code of the talk "Events with Drizzle" At Trufflecon 2019.

It shows how to capture Ethereum events using Drizzle and React.
It uses a simple ERC20 token for the example

## Get started

1. Install the ERC20 token (OpenZeppelin) with:

```
npm install
```

2. Start truffle console (it will also start Ganache):

```
truffle develop
```

3. Deploy smart contract:

(inside the truffle console)

```
migrate --reset
```

4. Install frontend dependencies:

```
cd app 
npm install
```

5. Run the frontend:

```
npm start
```
