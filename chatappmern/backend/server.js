const express = require("express");
const env = require("dotenv");
const { server } = require("./app");
const connectDb = require("./config/dbConfig");
const app = server();
// configuing env amd dbCOnnect file just one line
env.config();
connectDb();
// defining port
PORT = process.env.PORT || 8001;

// app.use statements
app.listen(PORT, () => {
  console.log("running on " + PORT);
});
