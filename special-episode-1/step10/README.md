# Step 10 - Implemented React

## Dev
Installed `babel-preset-react`, `react-hot-loader`, `react`, `react-dom`

Added `babel-polyfill` to webpack config for `async-await` support

Created `ethereum` object in `ethereum.js` that holds contract methods and available accounts. Passed into `App.js` to ensure everything is working

## Notes
`index.js` uses a promise (could've use `async` function too) to first resolve `accounts` and then pass that object into `App.js`. This flow is necessary if you don't want to use `componentDidMount` to fetch the accounts.

