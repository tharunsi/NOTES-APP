import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';


import MongoDB from './db/db.js'
import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'

dotenv.config()
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://notes-app-9y7d-tau.vercel.app' 
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/note',noteRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  MongoDB(); 
  console.log(`Server running on port ${PORT}`);
});