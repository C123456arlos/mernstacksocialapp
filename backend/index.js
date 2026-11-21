import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import postRoute from './routes/post.route.js'
import messageRoute from './routes/message.route.js'
import userRoute from './routes/user.routes.js'
import { app,server } from './socket/socket.js'
import dns from "node:dns/promises"
import path from 'path'
dns.setServers(["1.1.1.1"])
dotenv.config({})
const __dirname = path.resolve()
console.log(__dirname)
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
const corsOptions = {
    origin: process.env.URL,
    credentials:true
}
app.use(cors(corsOptions))
app.use('/api/v1/user', userRoute)
app.use('/api/v1/post',postRoute)
app.use('/api/v1/message', messageRoute)
app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*any', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', "index.html"))
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    connectDB()
    console.log(`server listening at port ${PORT}`)
})