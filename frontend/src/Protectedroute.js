import { useNavigate } from "react-router-dom"
import { Authuse } from "./context"

const Protectedroute=({children})=>{
    const navigate=useNavigate()
    const {token}=Authuse()
return token?children:navigate('/login')
}

export default Protectedroute;