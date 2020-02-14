import { generateStore } from 'drizzle';
import contractEventNotifier from './middleware';
import drizzleOptions from './drizzleOptions';

export default generateStore({
  drizzleOptions,
  appMiddlewares: [contractEventNotifier]
});

