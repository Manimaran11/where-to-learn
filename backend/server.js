var mongoose = require("mongoose");
mongoose.Promise = global.Promise;// makes Mongoose use native ES6 promise implementation
const getSecret = require("./secret");
// var cookieParser = require('cookie-parser');
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://wtluser:wtlpass@cluster0-h18tu.mongodb.net/test?retryWrites=true&w=majority/";
const client = new MongoClient(uri, { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


router.get("/test",(req,res)=>{
  MongoClient.connect(uri, {urlNewUrlParser: true}, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
         throw err;
    }
    console.log('Connected...');
    const collection = client.db("wtl").collection("wtl_topics");
    console.log(collection)
    // perform actions on the collection object
    client.close();
});
});

router.get("/list",(req,res)=>{
    var subCode = req.query.sc;
    var query = { sub_code: subCode};
MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
      var db = client.db("wtl");
      db.collection("wtl_topics").find(query).toArray(function(err,response){
        if (err) throw err;
      res.json({message:response});
      client.close()
    }); 
  }); 
    return res;
  });



router.get("/subcat",(req,res)=>{
  console.log("inside subcate")
  let category = req.query.sc;
  var query = { topic_code: category};
  console.log(query)
  MongoClient.connect(uri, function(err, client) {
    if (err) throw err;
    var db = client.db("wtl");
    const collection = db.collection("wtl_sub_topics");
    collection.find(query).toArray(function(err,response){
      if (err) throw err;
      console.log(response)
    res.json({message:response})
    client.close();
  });
  return res;
});
  
});

// router.

router.get("/", (req, res) => {
 return res.json({ message: "HELLOW DDD" });
});

router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));