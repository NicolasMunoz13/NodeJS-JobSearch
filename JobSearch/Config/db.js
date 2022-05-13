const mongoose = require('mongoose')
const config = require('./index')

const dbUserName = config.config.dbUserName
const dbPassword = config.config.dbPassword
const dbHost = config.config.dbHost
const dbName = config.config.dbName

const connection = async function(){
    const conn = await mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
    console.log("Mongo DB connected: ", conn.connection.host)
}

module.exports = {connection, mongoose}