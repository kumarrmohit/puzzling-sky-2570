const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    Image:String,
    body:String,
    price:String,
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}