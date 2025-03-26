import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import { connectDB } from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/message", messageRoutes )


app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`);
    connectDB();
})