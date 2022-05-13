const express = require('express')
const User = require('../services/users')

function users(app){
    const router = express.Router()

    const userService = new User()

    app.use("/api", router)

    router.get("/users", userService.allowIfLoggedin, userService.grantAccess('readAny', 'profile'), userService.getUsers);

    router.get("/user/:userId", userService.allowIfLoggedin, userService.getUserById);

    router.put("/user/:userId", userService.allowIfLoggedin, userService.grantAccess('updateAny', 'profile'), userService.updateUser);

    router.delete("/user/:userId", userService.allowIfLoggedin, userService.grantAccess('deleteAny', 'profile'), userService.deleteUser);

    /*router.get("/", (req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.post("/", (req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.put("/:id", (req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.delete("/:id", (req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })*/
}

module.exports = users