const mongoose = require('mongoose')

module.exports = mongoose.model(
    'Post',
    new mongoose.Schema({
        title: {type: String},
        content: {type: Text},
        date_modified: {type: Date}
    })
)
