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
    content: ""
  })
  doc.save()
  .then(save =>res.json(save))
  .catch(err => console.log("Error!:"+ err))
})

router.get('/doc',function(req,res){
   Doc.find({creator: req.user._id})
   .then(docs=>res.json(docs))
   .catch(err => console.log("Error!:"+ err))
})

module.exports = router;
