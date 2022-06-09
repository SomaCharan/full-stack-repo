const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const LoginHandler = require("./handlers/auth");
const UserHandler = require("./handlers/user");
const PaymentHandler = require("./handlers/payment");
const VideoHandler = require("./handlers/video");
const BankHandler = require("./handlers/bank");
const AdminHandler = require("./handlers/admin");
const WithdrawalHandler = require("./handlers/withdrawal");

const app = express();

const appName = "Success Thinks API";
const port = process.env.PORT || 4000;

const isDevelopment = port.toString().includes("4000");

const mongoUrl = isDevelopment
  ? "mongodb+srv://admin:gOlYb6hkwkPuByZv@cluster0.a9byj.mongodb.net/testDatabase?retryWrites=true&w=majority"
  : "mongodb+srv://admin:gOlYb6hkwkPuByZv@cluster0.a9byj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//mongoose connection
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB connected successfully");
});

app.use(express.static("public"));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Content-Disposition, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE, OPTIONS, PATCH");
  if (req.method === "OPTIONS") {
    return res.send();
  }
  next();
});

app.use("/auth", LoginHandler);
app.use("/user", UserHandler);
app.use("/payment", PaymentHandler);
app.use("/video", VideoHandler);
app.use("/admin", AdminHandler);
app.use("/bank", BankHandler);
app.use("/withdrawal-request", WithdrawalHandler);

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || err);
});

// app.get("/", function (req, res, next) {
//   res.send("isDevelopment = " + isDevelopment);
// });

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//listen
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
