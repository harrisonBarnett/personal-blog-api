const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// ****************************
// ROUTES FOR BLOG EDITING GUI
// ****************************
// GET login page
router.get('/', (req, res) => {
    res.render('login')
  })
  // POST authenticate and grant access to the editor
  router.post('/', (req, res) => {
    res.redirect('/dashboard')
  })
  // rerouting just in case
  router.get('/dashboard',  (req, res) => {
    Post.find({}).sort('-date_added')
      .then(posts => {
        res.render('dashboard', {posts})
      })
      .catch(err => console.error(err))
  
  })
  // GET an editor for a single blog post AUTH
  router.get('/archive/:id', (req, res) => {
    res.send('you are at the single post editor')
  })
  // UPDATE a single blog post AUTH
  router.put('/archive/:id', (req, res) => {
    res.send('updating an existing blog post')
  })