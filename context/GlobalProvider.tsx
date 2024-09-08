import { createContext, ReactNode, useContext, useEffect, useState } from "react";
//import { UserContext } from "./UserContext";
import { getCurrentUser } from "@/lib/appwrite";

interface UserProps {
    $collectionId: string,
    $createdAt: string,
    $databaseId: string,
    $id: string,
    $permissions: any[],
    $tenant: string,
    $updatedAt: string,
    accountId: string,
    avatar: string,
    email: string,
    username: string,
}
interface ContextProps {
    setIsLogged?: (isLogged: boolean) => void,
    setLoading?: (loading: boolean) => void,
    user: UserProps[],
    setUser?: any,
    loading: boolean,
    isLogged: boolean,
}
const GlobalContext = createContext<any>(null);



export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
 
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState<any>([])
    const [loading, setLoading] = useState(true)

    console.log("userGlobal", user?.username);
    useEffect(() => {
        if(!user?.username){
            getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLogged(true);
                    setUser(res);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
        } 
    }, [user])


    return (
        <GlobalContext.Provider value={{
            isLogged, setIsLogged,
            user, setUser,
            loading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
