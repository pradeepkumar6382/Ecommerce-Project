import { Children, createContext, useContext, useState } from "react";

const Newcontext=createContext(null);


const Authprovider=({children})=>{
const [token,settoken]=useState(localStorage.getItem("token"))
const logout=()=>{
    settoken()
    localStorage.clear()
}

    return(
    <Newcontext.Provider value={{token,settoken,logout}}>
        {children}
    </Newcontext.Provider>
    )
}

const Authuse=()=>{
    return useContext(Newcontext)
}

export {Authuse,Authprovider}