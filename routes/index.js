var express = require('express');
var router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
  res.redirect('/1')
})

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

router.post('/', (req, res) => {
  const { title, content } = req.body
  const newPost = new Post({
    title,
    content,
    date_added: Date.now(),
    date_modified: Date.now()
  })
  newPost.save()
    .then(()=>{
      res.redirect('/')
    })
    .catch(err => console.error(err))
})

module.exports = router;
