import {Formik} from 'formik'
import { useState } from 'react'
import axios from 'axios'
import {url_api} from '../../config'

const Layout = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    return(
        <>
            <h3>Daftar Sekarang</h3>

            {message !== '' ?
            <>
                <div style={{
                    backgroundColor: 'green',
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
                    password: '',
                    role: ''
                }}
                onSubmit={(values) => {
                    setTimeout(async () => {
                        try{
                            const res = await axios.post(`${url_api}/auth/register`, {
                                username: values.username,
                                password: values.password,
                                role: values.role
                            })

                            setLoading(false)
                            setMessage(res.data.message)
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
                            <label htmlFor='role'>Role</label><br/>
                            <select
                                id="role"
                                name="role"
                                required
                                onChange={handleChange}
                            >
                                <option value="">...</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
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