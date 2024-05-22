require("dotenv").config();
var cors = require("cors");

const express = require("express");
const studentRouter = require("./routes/Students");
const app = express();
app.use(cors());

port = 2000;
app.use(express.json());
app.use("/api/students", studentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
