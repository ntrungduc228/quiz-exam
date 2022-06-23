const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
app.use(cors({ origin: process.env.REACT_APP_URL }));
const initRoutes = require("./routes/web");
const connectDB = require("./configs/db.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB;
connectDB();

// Config routes
initRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
