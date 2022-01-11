require('dotenv').config()
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

// REDIRECT route for login
router.get('/', (req, res) => {
  res.redirect('/dashboard/login')
})
// ****************************
// ROUTES FOR API INTERACTION
// ****************************
// GET 5 posts at a time for personal site AUTH
router.get('/posts/:pageNo', verifyToken, (req, res) => {
  const resultsPerPage = 5
  const page = req.params.pageNo >= 1 ? req.params.pageNo : 1

  Post.find({})
    .sort('-date_added')
    .limit(resultsPerPage)
    .skip(resultsPerPage * (page - 1))
    .then(posts => {
      res.json({page, posts})
    })
    .catch(err => console.error(err))
})
// POST a new blog AUTH
router.post('/posts', verifyToken, (req, res) => {
  const { title, content, publish } = req.body
  const newPost = new Post({
    title,
    content,
    date_added: Date.now(),
    date_modified: Date.now(),
    is_published: publish
  })
  newPost.save()
    .then(()=>{
      res.redirect('/dashboard')
    })
    .catch(err => console.error(err))
})

// // GENERATE an access token
router.post('/generate', (req, res) => {
  const admin = {
    username: 'admin'
  }
  jwt.sign({admin}, process.env.JWT_SECRET, (err, token) => {
    res.json({token})
  })
})

// // VERIFY API token to GET and POST to posts
function verifyToken(req, res, next) {
  const header = req.headers['authorization']
  const cookie = req.cookies['Authorization']

  if(header) {
    const token = header.split(' ')[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified) {
      next()
    } else {
      res.sendStatus(403)
    }
  } else if(cookie) {
    const token = cookie.split(' ')[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified) {
      next()
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }


}


module.exports = router;
