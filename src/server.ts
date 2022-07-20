// const { useColors } = require('debug/src/browser');
import express, {
  Application,
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from "./routers/api";

const app: Application = express(); // set up for express
const options: cors.CorsOptions = {
  origin: true,
};
// to connect the mongodb
mongoose.connect("mongodb://localhost:27017/joblink").then(() => {
  console.log("connected");
});
app.use(cors(options));
app.use(express.static("public"));
app.use(express.json());


// routes
app.use("/api", apiRoutes);

// for error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
};
app.use(errorHandler);

// listen for request
app.listen(4000, () => console.log("Server Started at 4000"));
