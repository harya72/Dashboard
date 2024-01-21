import Data from "../models/model.js";
import jsonData from "../jsonData/jsondata.js";
const insertData = async () => {
  try {
    await Data.insertMany(jsonData);
    console.log("Data inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error.message);
  }
};

export default insertData;
