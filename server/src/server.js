import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/connection.js";
import router from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connecting to the Database
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} & Connected to Database`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// API routes
app.use("/api", router);
