import {createPool} from 'mysql2/promise'

export const getConnection = async () => {
    try{
        const pool = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tokoonline'
        })

        return pool
    }catch(err){
        console.log(err)
    }
}