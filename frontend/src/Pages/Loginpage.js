import { useState } from "react"
import Server from "../Server"
import { useNavigate } from "react-router-dom"
import { Authuse } from "../context"
import './Loginpage.css'

const Loginpage=()=>{
    const {settoken}=Authuse()
   const [logindetails,setlogindetails]=useState({username:'',password:''}) 
   const navigate=useNavigate()
  const handlesubmit=async()=>{
  if(logindetails.username && logindetails.password){
     await Server.post('/login',logindetails).then((res)=>{
        if(res.data.token){
            localStorage.setItem("token", res.data.token);
            settoken(res.data.token)
            navigate('/dashboard')
        }else{
            alert(res.data.msg)
        }
     })
  }
   }
    return (
        
        <div className="Login-container">
          <div className="box">
            <input type="text" className="username" placeholder="username" onChange={(e)=>{setlogindetails((prev)=>({...prev,username:e.target.value}))}}/>
            <input type="password" placeholder="password" onChange={(e)=>{setlogindetails((prev)=>({...prev,password:e.target.value}))}}/>
        <button onClick={handlesubmit}>Login</button>
        <button onClick={()=>navigate('/')}>Dont have an account?Register</button>
       </div> 
       </div>
        
    )
}
export default Loginpage;