const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDb = require("./connections/index");
const authRoutes = require("./routes/auth.js");
const propertyRoutes = require("./routes/propertyroute");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
/*routes*/
app.use("/api/auth", authRoutes);
app.use("/api/propertylist", propertyRoutes);

const URL = process.env.MONGO_URL;
connectToDb(URL);
const PORT = process.env.PORT || 3050;
const server = app.listen(PORT, () => {
  console.log(`${PORT} listened`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
