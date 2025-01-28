const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDb = require("./connections/index");

app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));
/*routes*/

//for login and signup
const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);

//for property List
const propertyRoutes = require("./routes/propertyroute");
app.use("/api/propertylist", propertyRoutes);

//for destinations
const destinationRoute = require("./routes/destinationRoute.js");
app.use("/api/destination", destinationRoute);

//for travelGuide
const travelGuideRoute = require("./routes/travelGuide.js");
app.use("/api/travelGuide", travelGuideRoute);

//database connectiona and starting the server
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
