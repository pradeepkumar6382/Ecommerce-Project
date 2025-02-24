import { useState } from "react"
import Server from "../Server"
import { useNavigate } from "react-router-dom"
import './Register.css'

const Registerpage=()=>{
    const navigate=useNavigate()
    const [register,setregister]=useState({name:'',password:''})
    const handlechange=(e)=>{
        const {name,value}=e.target
        setregister((prev)=>({...prev,[name]:value}))
    }
    const handlesubmit=async()=>{
        if(register.name && register.password){
             await Server.post('/register',register).then((res)=>{
                if(res.data.msg==="registered successfully"){
                    navigate('/login')
                }
       })
        }else{
            alert("please fill the data")
        } 
    }
    console.log(register)
    return (
        <>
        <div className="reg-container">
            <div className="box">
            <input type="text" name="name" placeholder="username" onChange={handlechange}/>
            <input type="password" name="password" placeholder="password" onChange={handlechange}/>
            <button onClick={handlesubmit}>Register</button>
            </div>
        </div>
        </>
    )
}
export default Registerpage;