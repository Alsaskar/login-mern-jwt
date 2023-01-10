import { useClient } from "../../components/client"
import {Link} from 'react-router-dom'

const Layout = ({user}) => {
    const client = useClient()

    return(
        <>
            <h2>Selamat Datang, {user.username}</h2>
            <p>Anda login sebagai User</p>

            <Link to="#" onClick={() => client.logout()}>Logout</Link>
        </>
    )
}

export default Layout