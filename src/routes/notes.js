const {Router} = require("express")
const db = require("../db")
const Notes = require("../models/Notes")
const { createException } = require("../utils/exceptions")
const router = Router()
router.get("/",async(req,res)=>{
    if(!req.cookies.email)return res.redirect("/singin")
    res.json(await Notes.find({creatorEmail: req.cookies.email}))
})
router.post("/",async(req,res)=>{
    if(!req.cookies.email) return res.redirect("/singin")
    try{
        const {title, description} = req.body
        const newNote = new Notes({
            title, 
            description, 
            creatorEmail:req.cookies.email,
            date: new Date().toLocaleDateString()
        })
        newNote.save((err)=>{
            if(err) createException(err, 500)
            else res.json({
                message:"Nueva nota creada"
            })
        })
    }catch(err){
        if(!err.status) return res.json({
            error:err.message
        })
        res.status(err.statusCode).json({
            state:"error",
            error:err.message
        })
    }
})
router.get("/remove/:id",async(req,res)=>{
    try{
        if(!req.params.id) createException("Id no espesificado",400)
        const note = await Notes.remove({_id:req.params.id})
        if(note[0].creatorEmail!=req.cookies.email) createException("No eres el creador de la tarea")
    }catch(err){
        if(!err.status) return res.json({
            error:err.message
        })
        res.status(err.statusCode).json({
            state:"error",
            error:err.message
        })
    }

})
router.get("/tal",async(req,res)=>{
    res.json(await Notes.remove())
})
module.exports = router