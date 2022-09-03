const mongoose = require('mongoose');
const connection = async () => {
    try {
        const conn = await mongoose.connect("mongodb://jaao:jaao@ac-kgdlujr-shard-00-00.shv0d69.mongodb.net:27017,ac-kgdlujr-shard-00-01.shv0d69.mongodb.net:27017,ac-kgdlujr-shard-00-02.shv0d69.mongodb.net:27017/?ssl=true&replicaSet=atlas-8hcdp9-shard-0&authSource=admin&retryWrites=true&w=majority")
        console.log('Mongo DB connected:', conn.connection.name)
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { connection }