const mongoose = require('mongoose')
const { mongoDbUri } = require('./config')

const connection = async () => {
    const conn = await mongoose.connect(mongoDbUri)
    // eslint-disable-next-line no-console
    console.log('Mongo DB connected:', conn.connection.name)
}

module.exports = { connection }