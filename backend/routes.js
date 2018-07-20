const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/models').User
const Doc = require('../models/models').Doc

router.post('/doc/create',function(req,res){
  console.log(req.user)
  var doc = new Doc({
    docName: req.body.docName,
    creator: req.user._id,
    collaborators:[req.user._id],
    content:""
  })
  doc.save()
  .then(save =>res.json(save))
  .catch(err => console.log("Error!:"+ err))
})

router.get('/doc/find',function(req,res){
    Doc.findOne({_id: req.query._id})
    .then(doc=>res.json(doc))
    .catch(err => console.log("Error!:"+ err))
})

router.post('/doc/update',function(req,res){
    console.log(req.body.content);
    Doc.findByIdAndUpdate(req.body._id, {content: req.body.content})
    .then(doc=>{console.log(doc); res.json(doc)})
    .catch(err => console.log("Error!:"+ err))
})

router.post('/doc/share',function(req,res){
    Doc.findByIdAndUpdate(req.body._id, {$push: {collaborators: req.user._id}})
    .then(doc=>{console.log(doc); res.json(doc)})
    .catch(err => console.log("Error!:"+ err))
})

router.get('/doc',function(req,res){
   Doc.find({collaborators: req.user._id})
   .then(docs=>res.json(docs))
   .catch(err => console.log("Error!:"+ err))
})





module.exports = router;
