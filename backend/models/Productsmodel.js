const mongoose=require('mongoose')

const products=mongoose.Schema({
    id:{type:Number},
    title:{type:String},
    category:{type:String},
    description:{type:String},
    price:{type:Number},
    rating:{type:Object},
    image:{type:String},
    status:{type:Number,default:1}
})

module.exports=products