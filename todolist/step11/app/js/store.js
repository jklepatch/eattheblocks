import { Drizzle, generateStore } from "drizzle";
import Todo from '../../contracts/ToDo.sol';

const options = { contracts: [Todo] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;