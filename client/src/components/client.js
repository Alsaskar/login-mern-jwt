import { createContext, useContext, useMemo, useState } from "react";
import axios from 'axios'
import { url_api } from "../config";

export const ClientContext = createContext(null)

const getAccountRole = (role) => {
    if(role === 'admin'){
        return 'admin'
    }else if(role === 'user'){
        return 'user'
    }
}

export const ClientProvider = ({children}) => {
    const [roleAccount, setRoleAccount] = useState(null)
    const [account, setAccount] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const role = useMemo(() => {
        if(roleAccount === null) return null

        return getAccountRole(roleAccount)
    }, [roleAccount])

    const authenticate = async () => {
        try{
            const res = await axios.get(`${url_api}/auth`, {
                headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
            })

            if(res.data.role === 'user'){
                setAccount(res.data)
            }else if(res.data.role === 'admin'){
                setAccount(res.data)
            }

            setRoleAccount(res.data.role)
            setIsAuthenticated(true)

            return res.data
        }catch(err){
            if(err.response.data.loggedIn === false){
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('role')
            }
        }
    }

    const logout = async () => {
        window.location = "/"
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        setIsAuthenticated(false)
    }

    const client = useMemo(() => {
        return {
            account,
            role,
            authenticate,
            logout,
            isAuthenticated
        }
    }, [account, role, isAuthenticated])

    return (
        <ClientContext.Provider value={client}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClient = () => {
    const client = useContext(ClientContext)
    return client;
}