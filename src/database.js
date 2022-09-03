const mongoose = require('mongoose')
const { dbUser, dbPassword, dbHost, dbHost1, dbHost2, dbPort } = require('./config')

const connection = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort},${dbHost1}:27017,${dbHost2}:${dbPort}/?ssl=true&replicaSet=atlas-8hcdp9-shard-0&authSource=admin&retryWrites=true&w=majority`
        )
        console.log('Mongo DB connected:', conn.connection.name)
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { connection }