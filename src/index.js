// mongodb+srv://joaofalcao33:<password>@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://joaofalcao33:RUPWoCFPA2UiesZB@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority
// joaofalcao33 RUPWoCFPA2UiesZB
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Person = require("./models/Person")

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

mongoose.connect("mongodb+srv://joaofalcao33:RUPWoCFPA2UiesZB@batisticluster.53e9kai.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("conectamos ao mongo db atlas")
    // entregar uma porta
    app.listen(3001)
})
.catch((err)=>{
    console.log(err)
})
