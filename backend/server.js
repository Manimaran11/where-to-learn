const mongoose = require("mongoose");
const getSecret = require("./secret");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const subjects = [{
  subject : "COMPUTER SCIENCE",
  code : "CS",
  sub_category : ["Algorithms","Artificial Intelligence","Networking","Operating Systems","Cyber Security"],
},
{
  subject : "ELECTRONICS",
  code : "ELEN",
  sub_category : ["VLSI","DIGITAL LOGIC"]
},
{
  subject : "LANGUAGES",
  code : "LANG",
  sub_category : ["English","Tamil","Hindi","Kannada","Spanish"]
}];

const thingsTOLearnCs= {
  "Algorithms":{
    "Courses" :["Coursera","edx","udacity"],
    "Books" :["Introduction to Algorithms by Thomas H. Cormen","Data Structures and Algorithms Made Easy","Data Structures and Algorithms in Java"],
    "codingPlatforms":["Codechef","spoj","hackerearth","hackerrank","leetcode"]
  },
  "Java":{
    "Courses" :["Coursera","edx","udacity"],
    "Books" :["Java 8 in action","Head First Design Principles","Head First Java"],
    "codingPlatforms":["Codechef","spoj","hackerearth","hackerrank","leetcode"]
  },
  "Operating Systems":{
    "Books":["Operating System Concepts","Modern Operating Systems","Operating Systems: Design and Implementation"],
    "Assignments":["CS224","CS234"],
    "Websites":["Geeks for Geeks"],
    "To do Projects":["Multi-Threaded Web Server","The Unix Shell","A file system"]
  }
};



const dbRoute =
  "mongodb+srv://wtluser:wtlpass@where-to-learn1-qwn5b.mongodb.net/test?retryWrites=true&w=majority";
console.log("ji")
// mongoose.connect(getSecret("dbUri"));
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true,useUnifiedTopology:true });
let db = mongoose.connection;
db.on('connected', function () {
 console.log('Mongoose default connection open to ' + dbRoute);
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/list",(req,res)=>{
  return res.json({message:subjects});
});

router.get("/subcat",(req,res)=>{
  console.log("inside subcate")
  let category = req.query.sc;
  console.log(category,thingsTOLearnCs[0])
  var response ;
  for(var x in thingsTOLearnCs){
    if(x == category)
      {
        return res.json({message:thingsTOLearnCs[x]});
      }
  }
  console.log(response);
  return res.json({message:"Not found"});
});

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