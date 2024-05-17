const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./config/dbCon");
const productRoute = require("./routes/product");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
