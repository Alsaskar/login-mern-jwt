import {Formik} from 'formik'
import { useState } from 'react'
import axios from 'axios'
import {url_api} from '../../config'
import { useHistory } from 'react-router-dom'

const Layout = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    return(
        <>
            <h3>Halaman Login</h3>

            {message !== '' ?
            <>
                <div style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px',
                    width: '50%'
                }}>
                    {message}
                </div><hr />
            </>
            : null}

            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    setTimeout(async () => {
                        try{
                            const res = await axios.post(`${url_api}/auth/login`, {
                                username: values.username,
                                password: values.password
                            })

                            setLoading(false)
                            
                            // menyimpan token
                            sessionStorage.setItem('token', res.data.token)
                            sessionStorage.setItem('role', res.data.role)
                            sessionStorage.setItem('idUser', res.data.id)

                            // redirect
                            history.push(`/${res.data.role}`)
                        }catch(err){
                            setLoading(false)
                            setMessage(err.response.data.message)
                        }
                    }, 1000)

                    setLoading(true)
                }}
            >

                {({values, errors, handleSubmit, handleChange}) => (

                    <form method='post' onSubmit={handleSubmit}>
                        <div style={{marginBottom: '1%'}}>
                            <label htmlFor='username'>Username</label><br/>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Masukkan Username"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{marginBottom: '1%'}}>
                            <label htmlFor='password'>Password</label><br/>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Masukkan Password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{marginBottom: '1%'}}>
                            {loading ?
                            <button disabled>Loading...</button>
                            :
                            <button type='submit'>Login</button>
                            }
                            
                        </div>
                    </form>

                )}

            </Formik>
        </>
    )
}

export default Layout