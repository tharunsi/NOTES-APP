import express from 'express'
import cors from 'cors'


import MongoDB from './db/db.js'
import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)

app.listen(5000, () => {
    MongoDB()
    console.log("server is running")
})