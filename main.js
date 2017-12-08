var express = require("express");
var app     = express();
var path    = require("path");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var MongoClient   = require('mongodb').MongoClient,
  assert  = require('assert');

var url = 'mongodb://const:lipsyncUU@ds133496.mlab.com:33496/lipsync'

app.use(session({ 
  secret: 'lipsync', 
  cookie: { secure: false , httpOnly:false},
}));

app.use(cookieParser('lipsync'));

app.get('/connectAndInsertAnswers', function(req, res, next)
{
  var answers = req.query.answers;
  var sessionID = req.sessionID;
  var documentName = 'userAnswers';

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertSession(db, sessionID, documentName, function(){
      db.close();
    });
  });

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertAnswers(db, answers, function(){
      db.close();
    });
  });
})

app.get('/connectAndInsertDemographics', function(req, res, next)
{
  var demographics = req.query.demographics;
  var sessionID = req.sessionID;
  var documentName = 'userDemographics';

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertSession(db, sessionID, documentName, function(){
      db.close();
    });
  });

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDemographics(db, demographics, function(){
      db.close();
    });
  });
})

var insertSession = function(db, sessionID, documentName, callback) {
  var collection = db.collection(documentName);

  var session = {
    sessionInfo:[]
  };
  session.sessionInfo.push({
      "sessionID" : sessionID
  });

  console.log(sessionID);

  collection.insert(session, function(err, result) 
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

var insertAnswers = function(db, answers, callback) {
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

var insertDemographics = function(db, demographics, callback) {
  var collection = db.collection('userDemographics');

  collection.insert(demographics, function(err, result) 
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