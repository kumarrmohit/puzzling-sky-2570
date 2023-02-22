const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    First_name:String,
    Last_name:String,
    email:String,
    Password:String,
    confirm:String,
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}