const mongoose = require("mongoose");
const Schema = mongoose.Schema;



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


const DataSchema = new Schema(
  {
    sub_code: {type : String, index : true},
    subject: String,
    sub_category: [String]
  },
  { timestamps: true } //Automatically creates created_at and updated_at
);

module.exports = mongoose.model("Data", DataSchema);