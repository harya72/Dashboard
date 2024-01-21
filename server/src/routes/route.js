import express from "express";
import { getAllData, getDataById } from "../controller/controller.js";

const router = express.Router();

router.get("/data", getAllData);
router.get("/data/:id", getDataById);

export default router;
