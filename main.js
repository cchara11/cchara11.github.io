var express = require("express");
var app     = express();
var path    = require("path");
var MongoClient   = require('mongodb').MongoClient,
  assert  = require('assert');

var url = 'mongodb://const:lipsyncUU@ds133496.mlab.com:33496/lipsync'


app.get('/connectAndInsert', function(req, res, next)
{
  var answers = req.query.answers;

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDocuments(db, answers, function(){
      db.close();
    });
  });
})

var insertDocuments = function(db, answers, callback) {
  var collection = db.collection('userAnswers');
  collection.insert(answers, function(err, result) 
  {
    assert.equal(err, null);
    if (err)
    {
      console.log("Insertion error");
    }
    else
    {
      console.log("Success");
    }
    callback(result);
  });
}

app.use(express.static('public'))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(process.env.PORT || 3000, function(){
});

console.log("Running at Port 3000");