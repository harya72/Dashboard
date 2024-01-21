import Data from "../models/model.js";

const getAllData = async (req, res, next) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getDataById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    console.log("Invalid ID");
    next("Invalid ID");
  }
};

export { getAllData, getDataById };
