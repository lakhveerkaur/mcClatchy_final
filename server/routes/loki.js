const Router = require('express').Router()
    , loki = require('lokijs')
    , db = new loki('loki.json')
    , news = db.addCollection('news');

//const newslist = db.addCollection('newslist');


function myFunction() {
setTimeout(function(){
  let gData = db.getCollection("news");
  gData.clear();
}, 1800000);
}

Router.post('/saveStatus', (req, res) => {
  console.log('inside save status');
  let status = req.body.status;
  console.log('params - > ', status);
  console.log('inside save status  -- > ');
  news.insert({status: status});
});
Router.post('/saveNews', (req, res) => {
  console.log('inside save status');
  let status = req.body.status;
  console.log('params - > ', status);
  console.log('inside save status  -- > ');
  news.insert({status: status});
});

Router.post('/saveDetails', (req, res) => {
  console.log('inside save status');
  let status = req.body.status;
  let comments = req.body.comments;
  let info = req.body.info;
  console.log('params - > ', status , comments ,info);
  news.insert({status: status,comments:comments,info:info});
  myFunction();
});

Router.get('/getStatus',(req,res) => {
  console.log("getStatus called");
  let status = news.get(1);
  let data = news.data;
  console.log('data - > ', data);
  console.log('status - > ', status);
  res.json(data);
})
module.exports = Router;
