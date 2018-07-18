"use strict";
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var expressValidator = require('express-validator');
app.use(expressValidator());
var Token = require('./tokenModel');
var User = require('./userModel');
var Post = require('./postModel');
mongoose.connect(process.env.MONGODB_URI);



//Routes for Users
app.post('/api/users/register', function(req, res){
  User.find({email: req.body.email}, function(err, results){
    console.log(results)
    if(results.length !== 0){
      res.send('User already registered')
    }else{
      var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(error, dbres){
        if(error){
          res.status(500).json({success: false})
        } else {
          res.json({success:true});
        }
      })
    }
  })
});

app.post('/api/users/login', function(req, res){
  User.find({email: req.body.email, password: req.body.password}, function(err, results){
    if(results.length === 0){
      res.status(301).json({"err": "Login Failed"});
    } else{
      var userToken = new Token({
        userId: results[0]._id,
        token: results[0].email + new Date(),
        createdAt: new Date()
      });
      userToken.save(function(fail){
        if(fail){
          res.status(500).json({fail: "Failed to save data"});
        } else{
          res.json({success: true,
            response: userToken
          })
        }
      })
    }
  })
});

app.get('/api/users/logout', function(req, res){
  Token.findOneAndRemove({token: req.query.token}, function(err, results){
    if(err){
      res.status(500).json({err: "Token not found"})
    } else if (results){
      console.log(results)
      res.status(200).json({success: true})
    } else {
      console.log(results)
      res.status(400).json({FailedToSupplyToken: "Token not found"})
    }
  })
});

//Routes for Posts
app.get('/api/posts', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else if (success){
      Post.find(function(error, results){
        if(error){
          res.status(500).json({FailedToQueryPosts: "Failed to query posts"});
        } else{
          // res.json({response: results, success: true});
          res.redirect('/api/posts/1/?token=' +req.query.token)
        }
      })
    } else {
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    }
  })
});

app.get('/api/posts/:page', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else if (success){
      Post.find(function(error, results){
        if(error){
          res.status(500).json({FailedToQueryPosts: "Failed to query posts"});
        } else{
          var arr = [];
          var i = (req.params.page-1)*10;
          var until = i+10;
          for (; i < until; i++) {
            arr.push(results[i]);
          }
          res.json({response: arr, success: true});
        }
      })
    } else {
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    }
  })
});

app.post('/api/posts', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else{
      var newPost = new Post({
        poster: req.body.poster,
        content: req.body.content,
        likes: req.body.likes,
        comments: req.body.comments,
        createdAt: req.body.date
      });
      newPost.save(function(error){
        if(error){
          res.status(500).json({FailedToSaveData: "Failed to save data"})
        }else {
          res.json({success: true, response: newPost})
        }
      })
    }
  })
});

app.get('/api/posts/comments/:post_id', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else{
      Post.findOne({_id: req.params.post_id}, function(fail, result){
        if(fail){
          res.status(500).json({FailedToGetCommentsOnPosts: "Failed to get comments on post"});
        } else if(result){
          res.status(200).json({success: true, comments: result.comments});
        }else{
          res.status(400).json({InvalidToken: "The token was not correct"})
        }
      })
    }
  })
});

app.post('/api/posts/comments/:post_id', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else{
      Post.findOne({_id: req.params.post_id}, function(fail, result){
        if(fail){
          res.status(500).json({FailedToGetCommentsOnPosts: "Failed to get comments on post"});
        } else if(result){
          var userCom = {};
          User.findOne({_id: success.userId}, function(no, yes){
            if(no){
              res.status(500).json({FailedToFindUser: "User not registered"})
            }else if(yes){
              userCom.name = yes.fname + ' ' + yes.lname;
              userCom.id = yes._id;
              var newComment = {
                createdAt: new Date(),
                content: req.body.content,
                poster: userCom
              };
              result.comments.push(newComment);
              result.save(function(mess){
                if(!mess){
                  res.status(200).json({success: true, comments: result});
                } else {
                  res.status(400).json({InvalidUserId: "UserId is not valid"})
                }
              })
            }
          })
        }
      })
    }
  })
});

app.get('/api/posts/likes/:post_id', function(req,res){
  Token.findOne({token: req.query.token}, function(err, success){
    if(err){
      res.status(500).json({TokenCannotBeVerified: "Are you logged in?"});
    } else{
      Post.findOne({_id: req.params.post_id}, function(fail, result){
        if(fail){
          res.status(500).json({FailedToGetLikesOnPosts: "Failed to get likes on post"});
        } else if(result){
          res.status(200).json({success: true, likes: result.likes});
        }else{
          res.status(400).json({InvalidToken: "The token was not correct"})
        }
      })
    }
  })
});




app.listen(3000, function (){
  console.log('listening')
});
