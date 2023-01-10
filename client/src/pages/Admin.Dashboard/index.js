import { useClient } from "../../components/client"
import Layout from "./Layout"
import Helmet from 'react-helmet'

const AdminDashboard = () => {
    const client = useClient()

    return(
        <>
            <Helmet>
                <title>Dashboard Admin</title>
            </Helmet>

            <Layout user={client.account}/>
        </>
    )
}

export default AdminDashboard