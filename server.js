const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.use(express.urlencoded({ extended: true }));

var db;
MongoClient.connect(
  "mongodb+srv://yoonjh517:Zpfhfh12@cluster0.qcnsn.mongodb.net/Cluster0?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);
    app.listen(8000, function () {
      console.log("listening on 8000 and mongodb connected");
    });
  }
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  res.send("sent");
});
