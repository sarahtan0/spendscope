import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

//makes sure the types of the environmental vars are valid
export default cleanEnv(process.env,{
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});