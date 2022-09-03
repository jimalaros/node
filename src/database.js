const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connection = async () => {
    try {
        const conn = await mongoose.connect(mongoUri)
        console.log('Mongo DB connected:', conn.connection.name)
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { connection }