const mongoose = require('mongoose')

// 78debGUpdDOC8ETU

const URI = `mongodb+srv://${process.env.USER_MONGO_DB}:${process.env.PASS_MONGO_DB}@${process.env.CLUSTER}/${process.env.NAME_DB}?retryWrites=true&w=majority`

mongoose.connect(URI)
    .then(db => console.log('Mongo is listen'))
    .catch(err => console.error(err)) 

module.exports = mongoose