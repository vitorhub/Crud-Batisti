// mongodb+srv://joaofalcao33:<password>@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://joaofalcao33:RUPWoCFPA2UiesZB@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority
// joaofalcao33 RUPWoCFPA2UiesZB
require('dotenv').config() // para dotenv
const express = require("express")
const mongoose = require("mongoose")
const app = express();

// forma de ver json
app.use(
    express.urlencoded({
            extended: true,
    })
)
app.use(express.json())

// rotas da api
const personRoutes = require("./routes/personRoutes")

app.use("/person", personRoutes) // toda rota /person é redirecionada para personRoutes

// rota inicial / endpoint
app.get("/", (req, res)=>{
    // mostrar requisição
    res.json({message: "oi express"})
})

const DB_USER = process.env.DB_USER     // para dotenv
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD) // para dotenv

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("conectamos ao mongo db atlas")
    // entregar uma porta
    app.listen(3001)
})
.catch((err)=>{
    console.log(err)
})
