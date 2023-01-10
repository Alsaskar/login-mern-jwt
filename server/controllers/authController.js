import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loggedIn, login, register } from '../models/authModel'

export const loginController = async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    try{
        const result = await login(data)
        const row = result[0]

        if(result.length > 0){ // jika username benar
            const match = await bcrypt.compare(data.password, row.password)

            if(match){ // jika password benar
                // daftarkan token
                const payload = {username: row.username}
                const token = jwt.sign(payload, '***003TOKEN', {expiresIn: '1day'})

                return res.status(200).json({
                    id: row.id,
                    username: row.username,
                    role: row.role,
                    success: true,
                    token: token
                })
            }else{ // jika password salah
                return res.status(400).json({
                    message: 'Password salah',
                    success: false
                })
            }
        }else{ // jika username salah
            return res.status(400).json({
                message: 'Username salah',
                success: false
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

export const registerController = async (req, res) => {
    const data = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    }

    try{
        await register(data)

        return res.status(200).json({
            message: 'Berhasil mendaftar. Silahkan Login',
            success: true
        })
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

// cek data user yang sedang login
export const loggedInController = async (req, res) => {
    const username = res.locals.jwt.username

    try{
        const result = await loggedIn(username)

        return res.status(200).json({
            id: result[0].id,
            username: result[0].username,
            role: result[0].role,
            loggedIn: true
        })
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}