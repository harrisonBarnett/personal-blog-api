var express = require('express');
var router = express.Router();
const Post = require('../models/Post')

// GET login page
router.get('/login', (req, res) => {
  res.render('login')
})
// POST authenticate and grant access to the editor
router.post('/login', (req, res) => {
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
// POST a new blog AUTH
router.post('/', (req, res) => {
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
// rerouting to page 1 just in case
router.get('/', (req, res) => {
  res.redirect('/1')
})
// GET 5 posts at a time for personal site AUTH
router.get('/:pageNo', (req, res) => {
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





module.exports = router;
