const express = require('express')
const Auth = require('../services/auth')
const {signup, login} = require("../services/auth")

function auth(app){
    const router = express.Router()

    //const authService = new Auth()

    app.use('/auth', router)

    /*
    router.post("/login", (req, res)=>{

        const user = authService.login(req.body)
        return res.json(user)

    })
    */

    router.post("/login", login);

    /*router.post("/signup", (req, res)=>{

        const user = authService.signup(req.body)
        return res.json(user)
    })*/

    router.post("/signup", signup);
}

module.exports = auth