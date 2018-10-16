import { Drizzle, generateStore } from "drizzle";
import Todo from '../../build/contracts/ToDo.json';

const options = { contracts: [Todo] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;