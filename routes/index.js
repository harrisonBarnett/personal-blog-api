var express = require('express');
var router = express.Router();
const Post = require('../models/Post')

// ****************************
// ROUTES FOR API INTERACTION
// ****************************
// GET 5 posts at a time for personal site AUTH
router.get('/posts/:pageNo', (req, res) => {
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
router.post('/posts', (req, res) => {
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

module.exports = router;
