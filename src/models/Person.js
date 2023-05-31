const mongoose = require("mongoose")

const Person = mongoose.model("Person",{ // define um model de nome person com tres valores
    name: String,       // name, salary e approved
    salary: Number,
    approved: Boolean,
})

module.exports = Person