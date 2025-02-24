const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const regschema=require('./models/Registermodel')
const products=require('./models/Productsmodel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const app=express()
const secretkey="pradeep"
app.use(express.json())
app.use(cors())

const admindb = mongoose.createConnection('mongodb+srv://Pradeep6382:Pradeep123%40@cluster0.3ncvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
admindb.on("connected", () => {
   console.log("MongoDB connected successfully!");
 });
const regmodel=admindb.model('registers',regschema)
const productmodel=admindb.model("products",products)

app.listen(8000,()=>{
    console.log("server connected")
})
const middleware = (req, res, next) => {
   const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       return res.status(401).json({ message: "No token provided" });
   }

   const token = authHeader.split(" ")[1];  
   try {
       const decoded = jwt.verify(token,secretkey); 
       req.user = decoded;  
       return next();  
   } catch (error) {
     console.log(error)
       if (error.name === "TokenExpiredError") {
           return res.status(401).json({ message: "Token expired" });
       }
       return res.status(401).json({ message: "Invalid token" });
   }
};
app.post('/register',async(req,res)=>{
    const {name,password}=req.body

    const hash=await bcrypt.hash(password,10)
    const data=new regmodel({username:name,password:hash})
   await data.save()
   res.json({msg:"registered successfully"})
})

app.post('/login',async(req,res)=>{
    console.log(req.body)
     const {username,password}=req.body
     const data=await regmodel.findOne({username})
     console.log(data)
     if(!data) return res.json({msg:"No user found"})
     const hashpass=await bcrypt.compare(password,data.password)
     console.log(hashpass)
     if(data.username===username && hashpass){
        const token = jwt.sign({ username: data.username }, secretkey, { expiresIn: '1h' });
         res.json({token:token})
     }else{
        res.json({success:false,msg:"check your password"})
     }
})
app.get('/getproducts',middleware,async(req,res)=>{
    const products=await productmodel.find()
   if(products){
    res.json(products)
   }else{
    res.json("failed")
   }
})


app.post('/editproducts',middleware,async(req,res)=>{
   console.log(req.headers.authorization)
   const {_id,...restfields}=req.body
   console.log(mongoose.isValidObjectId(_id))
   const products=await productmodel.findByIdAndUpdate({_id:_id},{...restfields})
   console.log(products)
   if(products){
      res.status(200).json({msg:"success"})
   }else{
      res.status(404).json({msg:"failure"})
   }
})

app.post('/deleteproducts',middleware,async(req,res)=>{
   console.log(req.headers.authorization)
   const {_id,...restfields}=req.body
   console.log(mongoose.isValidObjectId(_id))
   const products=await productmodel.findByIdAndDelete({_id:_id},{...restfields})
   console.log(products)
   if(products){
      res.status(200).json({msg:"success"})
   }else{
      res.status(404).json({msg:"failure"})
   }
})


