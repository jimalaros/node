require('dotenv').config()

const config = {
    port: process.env.PORT,
    dbUser: process.env.USER,
    dbPassword: process.env.PASSWORD,
    dbHost:process.env.HOST,
    dbHost1:process.env.HOST1,
    dbHost2:process.env.HOST2,
    dbPort:process.env.PORTDB,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = config