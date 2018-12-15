# Step 11 - Implemented Drizzle & Drizzle-React

## Dev
Installed `drizzle` and `drizzle-react`

## Store
Created `store.js`, where the `store` is created and then exported. Need to specify an `options` object, and name your contract, and pass it the contract `abi`

## Components
### Index
Use the `DrizzleContext` api from `drizzle-react` and pass the `App.js` into it, which will allow it and access the store.
### App
Pass `Container` component into the `DrizzleContext.Provider`, which will subscribe `Container` to any changes to the store, allowing it to rerender all components when data changes.

There is a check for `context.initialized` before any child components are rendered. Creating the drizzle store is async, so this ensures it has loaded before rendering the rest of the app.

Also, the `context` object is added to the `window` object, in case you or any viewers want to check out what it contains in the console.

### Header, NewTask, Tasks
Decorational components for now - they just fill out the page and don't function as of yet.
