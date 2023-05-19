const express = require("express");
const { dbConn } = require("./config/db");
const thoughtRoutes = require("./routes/thought");
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();
const port = 1000;
app.use(express.json());
app.use(cors());
app.use(thoughtRoutes);
app.use("/user", userRoutes);
dbConn();
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
