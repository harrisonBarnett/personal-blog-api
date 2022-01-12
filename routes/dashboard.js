const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

// ****************************
// ROUTES FOR BLOG EDITING GUI
// ****************************
// GET login page
router.get('/login', pushAuth, (req, res) => {
    res.render('login')
})
// POST authenticate and grant access to the editor
router.post('/login', (req, res) => {
  if(req.body.password === process.env.API_PASS) {
    const admin = {
      username: 'admin',
      password: req.body.password
    }
    jwt.sign({admin}, process.env.JWT_SECRET, (err, token) => {
      // assign a unique cookie that expires in 1hr
      res.cookie('Authorization', `Bearer ${token}`, {maxAge: 3600000})
      res.redirect('/dashboard')
    })
  } else {
    res.send(403)
  }

})
// GET the main dashboard
router.get('/', verifyAuth, (req, res) => {
  Post.find({}).sort('-date_added')
    .then(posts => {
      res.render('dashboard', {posts})
    })
    .catch(err => console.error(err))
})
// GET an editor for a single blog post AUTH
router.get('/archive/:id', verifyAuth, (req, res) => {
  res.send('you are at the single post editor')
})
// UPDATE a single blog post AUTH
router.put('/archive/:id', verifyAuth, (req, res) => {
  res.send('updating an existing blog post')
})

// // verify user, redirect to login if not auth
function verifyAuth(req, res, next) {
  const cookie = req.cookies['Authorization']
  if(typeof cookie !== 'undefined') {
    // // add middleware to do actual auth
    // req.token = cookie.split(' ')[1]
    next()
  } else {
    res.redirect('/dashboard/login')
  }
}

// // push authorized user to dashboard 
function pushAuth(req, res, next) {
  const cookie = req.cookies['Authorization']
  if(typeof cookie !== 'undefined') {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

module.exports = router