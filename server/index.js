require("dotenv").config();
const express = require("express");
const studentRouter = require("./routes/Students");
const app = express();
port = 2000;
app.use(express.json());
app.use("/api/students", studentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
