import { Link } from "react-router-dom"
import { useClient } from "../../components/client"

const Layout = ({user}) => {
    const client = useClient()

    return(
        <>
            <h2>Selamat Datang, {user.username}</h2>
            <p>Anda login sebagai Administrator</p>

            <Link to="#" onClick={() => client.logout()}>Logout</Link>
        </>
    )
}

export default Layout