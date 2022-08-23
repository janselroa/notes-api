const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://janselroa:Gi4QtWjsRM1JmdPN@cluster0.mkb7tew.mongodb.net/midb?retryWrites=true&w=majority`,{
	 useNewUrlParser: true,
	 useUnifiedTopology: true
}).then(data=>console.log("DB conectada")).catch(err=>console.error(err))