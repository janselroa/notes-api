const mongoose = require("mongoose")
mongoose.connect(process.env.DBHOST,{
	 useNewUrlParser: true,
	 useUnifiedTopology: true
}).then(data=>console.log("DB conectada")).catch(err=>console.error(err))
