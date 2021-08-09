const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

var db;
MongoClient.connect(
  "mongodb+srv://yoonjh517:Zpfhfh12@cluster0.qcnsn.mongodb.net/Cluster0?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("todoapp");

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

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((err, result) => {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});

app.post("/add", (req, res) => {
  db.collection("counter").findOne({ name: "postsNumber" }, (err, result) => {
    var postsNumber = result.totalPost;
    db.collection("post").insertOne(
      {
        _id: postsNumber + 1,
        title: req.body.title,
        date: req.body.date,
      },
      (err, result) => {
        db.collection("counter").updateOne(
          { name: "postsNumber" },
          { $inc: { totalPost: 1 } },
          (err, result) => {
            if (err) {
              return console.log(err);
            }
            res.send("sent");
          }
        );
      }
    );
  });
});
