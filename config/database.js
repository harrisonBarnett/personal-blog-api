const mongoose = require('mongoose')

module.exports = function(URL) {
    mongoose.connect(URL, () => {
        console.log('Connected to MongoDB...')
    })
}