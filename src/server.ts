// const { useColors } = require('debug/src/browser');
import express, {
  Application,
  Request,
  Response,
  NextFunction,
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
mongoose.connect("mongodb://localhost/joblink").then(() => {
  console.log("connected");
});
app.use(cors(options));
app.use(express.static("public"));
mongoose.Promise = global.Promise;
app.use(express.json());

const db = mongoose.connection; // it show the message in the terminal

app.post("/joblink/create-project", async (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

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

// app.get('/api/project', (req,res) => {
//     database.collection('project').find({}).toArray((err,result) => {
//         if(err) throw err
//         res.send(result)
//     })
// })
