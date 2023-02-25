const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { First_name,Last_name, email, Password, confirm } = req.body
    try {
        bcrypt.hash(Password, 9, async (err, hash) => {
            if (err) res.send({ "msg": "something went wrong", "error": err.message })
            else {
                const user = new UserModel({First_name, Last_name, email,Password:hash,confirm })
                 
                await user.save()
                res.send({ "msg": "New user has been registered" }) 
            }
        });
    } 
    catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const {email,Password} = req.body
    try {
        const user = await UserModel.find({email})
        if (user.length > 0) {
            bcrypt.compare(Password, user[0].Password, (err, result) => {
                if (result) {
                    let token = jwt.sign({userID:user[0]._id }, "masai")
                    res.send({ "msg": "Logged in", "token": token })
                } else {
                    res.send({ "msg": "Wrong credentials"})
                }
            })
        } else {
            res.send({ "msg": "Wrong credentials" })
        }
    }
    catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }

})

module.exports = {
    userRouter
}
