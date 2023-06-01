const router = require("express").Router();

const Person = require("../models/Person")

// criação de dados
router.post("/" , async (req, res)=>{
    const {name, salary, approved } = req.body

    if(!name){  // validações necessárias para todos os campos
        res.status(402).json({message: "o nome é obrigatório"})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person) // usa model de person para CREATE person no bd
        res.status(201).json({message: "Pessoa criado com sucesso"})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - leitura de dados
router.get("/", async (req,res)=> {
    try {
        const people = await Person.find()  // retorna todos os dados da collection
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get("/:id", async (req,res) =>{
    const id = req.params.id  // extrair o dado da requisição, pela url = req.params
    try {
        const person = await Person.findOne({_id: id}) // _id é do mongodb id é o parametro apos person/
        if(!person){
            res.status(422).json({message: "user not found, id incorrect"})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// update atualização de dados PUT E PATCH
router.patch("/:id", async (req, res)=>{
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = { 
        name,
        salary,
        approved,
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        console.log(updatedPerson.matchedCount)
        if(updatedPerson.matchedCount === 0){ // quantos registros ele atualizou
            res.status(422).json({message: "nada foi atualizado"})
            return
        }  
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: "caiu na 70"})
    }
})

// Deletar dados 
router.delete("/:id" , async(req,res)=>{
    const id = req.params.id

    const person = await Person.findOne({_id: id})
    if(!person){
        res.status(422).json({message: "não encontrado para deletar"})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "deletado com sucesso"})
    } catch (error) {
        res.status(500).json({message: "catch 85"})
    }

})

module.exports = router