const {Router} = require("express")
const db = require("../db")
const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const {createException} = require("../utils/exceptions")
const router = Router()

// registro de usuarios
router.post("/singup",async(req,res)=>{
    try{
        const {name, email, password} = req.body
        const user = await Users.find({email})
        if(user.length>=1) createException("El email ya esta registrado",400)
        if(password.length<5) createException("Contraseña invalida",400)
        const regEmail  = /\S+@\S+\.\S+/
        if(!regEmail.test(email)) createException("Email invalido",400)
        const newUser = new Users({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.json({
            state:"success",
            message:"Nuevo usuario creado"
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

//login o singin
router.post("/singin",async(req,res)=>{
    try{
        const {email, password} = req.body
        const user = await Users.find({email})
        if(!user) createException("Email no registrado",404)
        if(!(await bcrypt.compare(password, user[0].password))) createException("La contraseña no coincide",400)
        res.cookie("email",user[0].email)
        res.cookie("name",user[0].name)
        res.json({
            state:"success",
            message:"Login exitoso"
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
router.get("/",async(req,res)=>{
    res.json(req.cookies)
})
router.get("/logout", (req, res) => {
    
});
module.exports = router