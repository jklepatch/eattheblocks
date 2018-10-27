# Step 12

## Components
### Added functionality to `NewTask` , `Tasks` and `Task` component
`NewTask` is a form component
  - Uses `contracts` object from `drizzle` to call `createTask` and send tx (async)

`Tasks` renders each `Task` component

`Task` is a child component of `Tasks` that is a row in the table that is `Tasks`
  - Renders values returned from `getTask`
  - The `onclick` of the checkbox will fire off the `toggleDone` method

## Library
Modified `formatDate` to be compatible with returned values from `drizzle`

## Dev
Added `devtool` prop to webpack to get a source map (debugging was difficult without)

Added `transform-object-rest-spread` plugin to support spread operator

Added `dist/` folder to `.gitignore`

## Notes
If using metamask, might run into issue where `drizzle` will use the injected `web3` and try to use your `account[0]` in metamask and not the `account[0]` truffle provides. I just removed metamask because I don't keep anything on it. Alternatively, you can try to send your `account[0]` ether, or import the pk of one of the truffle accounts and make sure you point the app to that account (ie `account[2]`).

## About Drizzle and Drizzle-React
Drizzle is essentially a `redux` store. Using websockets, it listens for new blocks. In the app, we can specify events we want to listen for, or rather subscribe to, such as a new `Task` being added. Only if this event occurs in the newest block will an `actionCreator` being fired off, the store updated, and your app rerendered. Essentially, the benefit of drizzle is that it keeps the data displayed in your app up to date and keeps track of state for you. It will save you from writing code. 

`Drizzle-React` is a library for integrating the `Drizzle` store into your react app. It makes use of the react v16 context api to pass the store into your app as props.

### High level how it works
You can access the methods of your contract through the `drizzle.contracts` object. `componentDidMount` is used as the function where the initial fetch of smart contract data occurs. These methods will return a `dataKey` hash. This acts as a key. When the call is resolved, the corresponding value to that key is stored in on object on `drizzleState`. You can plug the key into this object to get the value, and render it (this takes place in the `render` method). The first time `render` is called, the fetch probably hasn't resolved, so the object that holds the value doesn't exist. That's why I have it wrapped it a `try catch`. 

It's a bit of a different flow that was hard for me to grasp at first. There is a simple example on the github for `drizzle-react`, but a good place to look in this app is the `Tasks` component.