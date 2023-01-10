import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useClient } from "./client";

export const PrivateRoute = ({...props}) => {
    const client = useClient()
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const authenticated = await client.authenticate()
            
            // jika hasilnya undefined - bila belum login
            if(authenticated === undefined){
                setIsAuth(false)
            }else{ // jika sudah login
                setIsAuth(true)
            }
        }

        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isAuth === null) return (<>Loading...</>)

    // jika user belum login, kembali ke halaman utama
    if(isAuth === false) return (<Redirect to="/" />)

    // jika user telah login, maka akan tampilkan route yang ada
    return (<Route {...props}/>)
}