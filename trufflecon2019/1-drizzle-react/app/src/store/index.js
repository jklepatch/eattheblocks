import { generateStore } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import appMiddlewares from './middlewares'

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})

// Use the store with DrizzleProvider
export default store
