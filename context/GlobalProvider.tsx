import {ReactNode, useEffect, useState} from "react";
import { UserContext } from "./UserContext";
import { getCurrentUser } from "@/lib/appwrite";




const GlobalProvider = ({children}:{children:ReactNode})=>{
    const [isLogged,setIsLogged]= useState(false)
    const [user,setUser] =useState<any>(null)
    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        getCurrentUser().then((res)=>{
            if(res){
                setIsLogged(true)
                setUser(res)
            }else{
                setIsLogged(false)
                setUser(null)
            }
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false)
        })
    },[])


    return(
        <UserContext.Provider value={{
            isLogged,setIsLogged,
            user,setUser,
            loading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default GlobalProvider
