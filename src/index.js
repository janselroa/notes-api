const {resolve} = require("path")
const express = require("express")
const cookieParser = require("cookie-parser")

require("dotenv").config({
    path:__dirname+"/.env"
})
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(require('cors')())
app.use(express.urlencoded({extended:true}))
app.use(express.static(resolve("/public",__dirname,"/public")))
app.use(cookieParser(process.env.secret))
app.set("views", __dirname+"/public")

//cors

// routes

app.use("/api/users",require("./routes/users"))
app.use("/api/notes",require("./routes/notes"))

app.listen(port,()=>console.log(`Application running on http://localhost:${port}`))