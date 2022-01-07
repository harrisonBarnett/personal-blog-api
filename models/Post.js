const mongoose = require('mongoose')

module.exports = mongoose.model(
    'Post',
    new mongoose.Schema({
        title: {type: String},
        content: {type: String},
        date_added: {type: Date},
        date_modified: {type: Date}
    })
)
