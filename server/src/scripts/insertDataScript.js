import { connectToDatabase, disconnectFromDatabase } from "../db/connection.js";
import insertData from "../utils/insertData.js";

const runScript = async () => {
  await connectToDatabase();
  await insertData();
  await disconnectFromDatabase();
};

runScript();
