const connection = require("./models/db_connection");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/product", require("./routes/product_routes"));

app.use("/api/user", require("./routes/user_routes"));

app.listen("8080", () => {
  console.log("Server Started...");
});
