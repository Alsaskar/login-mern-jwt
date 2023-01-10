import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import { useEffect } from "react";
import Helmet from 'react-helmet'

const Register = () => {
    const history = useHistory()

    useEffect(() => {
        // jika sudah login, tidak bisa kesini
        if(sessionStorage.getItem('token') !== null){
            history.push(`/${sessionStorage.getItem('role')}`)
        }
    }, [history])

    return(
        <>
            <Helmet>
                <title>Daftar Sekarang</title>
            </Helmet>

            <Layout />
        </>
    )
}

export default Register;