import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import { connectDB } from './lib/db.js';
import cors from 'cors'
import { app,server } from './lib/Socket.js'

dotenv.config();
const PORT = process.env.PORT



app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes )


server.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`);
    connectDB();
})