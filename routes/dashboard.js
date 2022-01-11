const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// ****************************
// ROUTES FOR BLOG EDITING GUI
// ****************************
// GET login page
router.get('/login', (req, res) => {
    res.render('login')
})
// POST authenticate and grant access to the editor
router.post('/login', (req, res) => {
  res.redirect('/dashboard')
})
// GET the main dashboard
router.get('/',  (req, res) => {
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

module.exports = router