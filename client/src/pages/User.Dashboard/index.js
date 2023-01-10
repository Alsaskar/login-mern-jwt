import { useClient } from "../../components/client"
import Layout from "./Layout"
import Helmet from 'react-helmet'

const UserDashboard = () => {
    const client = useClient()

    return(
        <>
            <Helmet>
                <title>Dashboard User</title>
            </Helmet>

            <Layout user={client.account}/>
        </>
    )
}

export default UserDashboard