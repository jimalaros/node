const mongoose = require('mongoose')
const { mongoDbUri } = require('./config')

const connection = async () => {
    const conn = await mongoose.connect(mongoDbUri)
    console.log('Mongo DB connected:', conn.connection.name)
}

module.exports = { connection }