require('dotenv').config()

const config = {
    port: process.env.PORT,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = {config}