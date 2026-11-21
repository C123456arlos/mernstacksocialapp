// import { Server } from 'socket.io'
// import express from 'express'
// import http from 'http'
// const app = express()
// const server = http.createServer(app)
// const io = new Server(server, {cors: {
//     origin: 'http://localhost:5173',
//     methods:['GET', 'POST']
// }
// })
// const userSocketMap = {}
// export const getReceiverSocketId = (receiverId) =>userSocketMap[receiverId]
// io.on('connection', (socket )=> {
//     const userId = socket.handshake.query.userId
//     if (userId) {
//         userSocketMap[userId] = socket.id
//         console.log(`user connected userId = ${userId}, socketId =${socket.id}`)
//     }
//     io.emit('getOnlineUsers', Object.keys(userSocketMap))
//     socket.on('disconnect', () => {
//         if (userId) {
//             console.log(`user connected userId=${userId}, socketId=${socket.id}`)
//             delete userSocketMap[userId]
//         }
//         io.emit('getOnlineUsers', Object.keys(userSocketMap))
//     })
// })
// export {app, server, io}
import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.URL,
        methods:['GET', 'POST']
    }
})
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]

}
const userSocketMap={}
io.on('connection', (socket) => {
    console.log('a user connected', socket.id)
    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})
export {io, app, server}