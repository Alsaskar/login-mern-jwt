import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

// Router
import AuthRouter from './routes/authRoute'

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}))

// Configure Router
app.use('/auth', AuthRouter)

app.listen(8080, () => {
    console.log('server running')
})