const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
