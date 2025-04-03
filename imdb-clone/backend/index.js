const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const movieRouter = require("./routes/movieRouter");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/movie", movieRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
