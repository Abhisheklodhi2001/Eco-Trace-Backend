const express = require("express");
const bodyParser = require("body-parser");
const purchaseGood = require("./routes/purchasedgood");
const upDownLease = require('./routes/upDownLease');
const business = require("./routes/businesstravel");
const wasteGenerated = require("./routes/wastegenerated")
const stationaryComb = require("./routes/stationaryCombustion")
const scope1 = require("./routes/scope1")
const scope2 = require("./routes/scope2")
const user = require("./routes/user")
const report = require("./routes/report")
const dashboard = require("./routes/dashboard")
const tree = require("./routes/tree")
const target = require("./routes/targetSetting")
const ghgEmissionReport = require("./routes/ghgEmissionReport");
const kpiReport = require("./routes/kpiReport");
const app = express();
const path = require('node:path');
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require("fs");



app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
    limit: '100mb'
  })
);

app.use(express.static("public"));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use("/", purchaseGood);
app.use("/", upDownLease);
app.use("/", business);
app.use("/", wasteGenerated);
app.use("/", stationaryComb);
app.use("/", scope1);
app.use("/", scope2);
app.use("/", user);
app.use("/", dashboard);
app.use("/report", report)
app.use("/targetsetting", target)
app.use("/", tree);
app.use("/", ghgEmissionReport);
app.use("/", kpiReport);

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*", "http://13.200.247.29:4000", {
    reconnect: true,
  });
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept, X-Custom-Header,Authorization"
  );
  res.setHeader("Content-Type", "text/plain");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    //return res.send({ success: "0", message: "Welcome to Eko-Trace Backend" });
    return res.sendFile(path.join(__dirname, '/public/image', 'ekotrace_backend.jpg'));
  }
});

app.use('/success', express.static(path.join(__dirname + "/controller/view/message.html")));

app.get("/server", (req, res) => {
  return res.status(200).json({ message: "Eco Trace server is running" });
})

const PORT = 4000;

// https
//     .createServer(
//         {
//             ca: fs.readFileSync("/var/www/html/ssl/ca_bundle.crt"),
//             key: fs.readFileSync("/var/www/html/ssl/private.key"),
//             cert: fs.readFileSync("/var/www/html/ssl/certificate.crt"),
//         },
//         app
//     )
//     .listen(PORT, () => {
//         console.log(`server is runing at port ${PORT}`);
//     });
// https.createServer(
//   {
//     key: fs.readFileSync("/var/www/html/ssl/Private_key_1.key"),
//     cert: fs.readFileSync("/var/www/html/ssl/certificate.crt"),
//     ca: fs.readFileSync("/var/www/html/ssl/ca_bundle.crt"),
//   },
//   app
// ).listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });

app.listen(PORT, function () {
  console.log(`Node app is running on port ${PORT}`);
});


module.exports = app;