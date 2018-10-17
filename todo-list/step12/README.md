# Step 12

## Components
-Added functionality to `NewTask` and `Task` component

-Created `Task` component

## Library
-Modified `formatDate` to be compatible with returned values from `drizzle`

## Dev
-Added `devtool` prop to webpack to get a source map (debugging was difficult without)

-Added `transform-object-rest-spread` plugin to support spread operator

-Added `dist/` folder to `.gitignore`

## Notes
If using metamask, might run into issue where `drizzle` will use the injected `web3` and try to use your `account[0]` in metamask and not the `account[0]` truffle provides. I just removed metamask because I don't keep anything on it. Alternatively, you can try to send your `account[0]` ether, or import the pk of one of the truffle accounts and make sure you point the app to that account (ie `account[2]`).