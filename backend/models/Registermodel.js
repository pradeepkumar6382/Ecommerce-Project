const mongoose=require('mongoose')
const admindb=require('../index')

const regschema=new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})

// const regmodel=mongoose.model("Register",regschema)


module.exports = regschema; 