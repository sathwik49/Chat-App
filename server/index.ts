import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mainRouter from './routes/mainRouter.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
  


app.use('/api/v1',mainRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
