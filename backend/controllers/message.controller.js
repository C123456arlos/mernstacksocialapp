import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const { textMessage: message } = req.body
        
        let conversation = await Conversation.findOne({ participants: { $all: [ senderId, receiverId ] } })
        if (!conversation) {
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }
        const newMessage = await Message.create({ senderId, receiverId, message })
        if (newMessage) conversation.messages.push(newMessage._id)
        await Promise.all([conversation.save(), newMessage.save()])
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }
        
        return res.status(201).json({success:true, newMessage})
    } catch (error) {
        console.log(error)
    }
}
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const conversation = await Conversation.findOne({
            participants: {
                $all: [ senderId, receiverId ]
}
        }).populate('messages')
        if (!conversation) return res.status(200).json({ success: true, messages: [] })
        return res.status(200).json({ success: true, messages: conversation?.messages })
    } catch (error) {
        console.log(error)
    }
}
// export const getMessage = async (req, res) => {
//     try {
//         const { id: userToChatId } = req.params
//         const myId = req.id
//         const messages = await Message.find({
//             $or: [
//                 { senderId: myId, receiverId: userToChatId },
//                 {senderId:userToChatId, receiverId:myId}
//             ]
//         })
//         // res.status(200).json({messages:conversation?.messages})
//         res.status(200).json(messages)
//     } catch (error) {
//         console.log('error in getMessages controller', error.message)
//         res.status(500).json({error:error.message})
//         // res.status(500).json({error:'internal server error'})
//     }
// }
// export const sendMessage = async (req, res) => {
//     try {
//         const {textMessage: message } = req.body
//         const { id: receiverId } = req.params
//         const senderId = req.id
//         // let imageUrl
//         // if (image) {
//         //     const uploadResponse = await cloudinary.uploader.upload(image)
//         //     imageUrl=uploadResponse.secure_url
//         // }
//         // const newMessage = new Message({
//         //     senderId, receiverId, text, image:imageUrl
//         // })
//         const newMessage = new Message({
//             senderId, receiverId, message        })
//         await newMessage.save()
//         console.log(newMessage, 'newMessage')
//         const receiverSocketId = getReceiverSocketId(receiverId)
//         if (receiverSocketId) {
//             // io.emit('newMessage', newMessage)
//             io.to(receiverSocketId).emit('newMessage', newMessage)
//                     }
//         res.status(201).json(newMessage)
//     } catch (error) {
//         console.log('error in sendMessage controller', error.message)
//         res.status(500).json({error:error.message})
//     }
// }