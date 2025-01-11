import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import errorHandler from "./middleware/errorHandler";

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
app.use(express.json())
app.use(cors());
// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    
    // setup API
    routes.forEach((route) => {
      app.use(route.path, route.router);
    });

    // setup middleware
    app.use(errorHandler);
    // Save the resource to the database
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
