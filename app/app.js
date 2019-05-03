const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.get("/", (req, res) => {
  res.json({ message: "GroceryList API" });
});

require("./routes/Product.route.js")(app);
require("./routes/List.route.js")(app);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
