var express = require("express");
var cors = require("cors");
const morgan = require("morgan");
var app = express();
const {
  getAllCarData,
  postCarData,
  getSingleCarData,
} = require("./database/index");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("common"));

app.get("/api/v1/cars", function (req, res) {
  getAllCarData(req, res);
});

app.post("/api/v1/cars/post", function (req, res) {
  postCarData(req, res);
});

app.get("/api/v1/cars/:id", function (req, res) {
  getSingleCarData(req, res);
});

app.listen(process.env.PORT, function () {
  console.log(`thd-cars server listening on port: ${process.env.PORT}`);
});
