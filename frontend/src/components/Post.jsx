import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import {Button} from './ui/button'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import {  FaHeart, FaRegHeart} from "react-icons/fa"
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '../redux/postSlice'
import {Badge} from './ui/badge'

const Post = ({post}) => {
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    const { selectedPost, posts } = useSelector(store => store.post)
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false)
    const [postLike, setPostLike] = useState(post.likes.length)
    const [comment, setComment] = useState([])
    // const [comment, setComment] = useState([])
    console.log('comments', comment.length)
    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedPost) {
            setComment(post.comments)
        }
    }, [selectedPost])
    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText('')
        }
    }
    const likeOrUnlikeHandler = async () => {
        try {
            const action = liked ? 'unlike':'like'
            const res = await axios.get(`https://mernstacksocialapp.onrender.com/api/v1/post/${post._id}/${action}`, 
                { withCredentials: true })
            if (res.data.success) {
                const updatedLikes= liked ? postLike -1 :postLike+1
                setPostLike(updatedLikes)
                setLiked(!liked)
                const updatedPostData = posts.map(p => p._id === post._id ? { ...p, likes: liked ? p.likes.filter(id => id !== user._id) :[...p.likes, user._id] }: p
                )
                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message)
                }
        } catch (error) {
           console.log(error) 
        }
    }
    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://mernstacksocialapp.onrender.com/api/v1/post/${post._id}/comment`, { text }, 
                { headers:{'Content-Type':'application/json'}, withCredentials:true}
            )
            if (res.data.success) {
                // const updatedCommentData = [ res.data.comment]
                const updatedCommentData = [...comment, res.data.comment]
                console.log('updated comment data' , updatedCommentData)
                setComment(updatedCommentData)
                const updatedPostData = posts.map(p => p._id === post._id ? { ...p, comments: updatedCommentData } : p)
                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message)
                setText('')
            }
                //   if (res.data.success) {
                //      const updatedCommentData = [...comment, res.data.comment]
                //      setComment(updatedCommentData)
                //      const updatedPostData = posts.map(p => p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p)
                //      dispatch(setPosts(updatedPostData))
                //             toast.success(res.data.message)
                //             setText('')
                //         }
        } catch (error) {
            console.log(error)
        }
    }
    const deletePostHandler = async() => {
        try {
            const res = await axios.delete(`https://mernstacksocialapp.onrender.com/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatePostData = posts.filter((postItem) => postItem?._id !== post?._id)
                dispatch(setPosts(updatePostData))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    const bookmarkHandler = async() => {
        try {
            const res = await axios.get(`https://mernstacksocialapp.onrender.com/api/v1/post/${post._id}/bookmark`, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
      <div className='my-8 w-full max-w-sm mx-auto'>
          <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2' >
          <Avatar>
              <AvatarImage src={post.author.profilePicture}></AvatarImage>
              <AvatarFallback>app</AvatarFallback>
                  </Avatar>
                  <div className='flex items-center gap-3'>
                      <h1>{post.author?.username}</h1>
                    {user?._id===post.author._id && <Badge variant='secondary'>author</Badge>}  
                  </div>
              </div>
              <Dialog>
                  <DialogTrigger asChild>
                      <MoreHorizontal className='cursor-pointer'></MoreHorizontal>
                  </DialogTrigger>
                  <DialogContent className='flex flex-col items-center text-sm text-center'>
                      {
                          post?.author?._id !== user?._id && 
                      <Button variant='ghost' className={'cursor-pointer w-fit text-[#ed4956] border-accent border font-bold'}>unfollow</Button>
                      }
                      <Button variant='ghost' className={'cursor-pointer w-fit'}>add to favorites</Button>
                      {
                          user && user?._id === post?.author._id &&
                      <Button variant='ghost' onClick={deletePostHandler} className={'cursor-pointer w-fit'}>delete</Button>
                      }
                  </DialogContent>
              </Dialog>
          </div>
          <img className='rounded-sm my-2 w-full aspect-square object-cover'
              src={post.image} alt='post'></img>
              <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-3'>
                  {
                      liked ? <FaHeart size={'24'} onClick={likeOrUnlikeHandler} className='cursor-pointer text-red-600'></FaHeart>
                          :
              <FaRegHeart onClick={likeOrUnlikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600'></FaRegHeart>
                  }
                  <MessageCircle onClick={() => { 
                      dispatch(setSelectedPost(post))
                      setOpen(true)
              } }  className='cursor-pointer hover:text-gray-600'></MessageCircle>
              <Send className='cursor-pointer hover:text-gray-600'></Send>
              </div>
              <Bookmark onClick={bookmarkHandler} className='cursor-pointer hover:text-gray-600 '></Bookmark>
              </div>
          <span className='font-medium block mb-2'>{postLike} likes</span>
          <p>
              <span className='font-medium mr-2'>{post.author?.username}</span>{post.caption}
          </p>
          {
              post.comments.length > 0 && (
          <span onClick={() => {
              dispatch(setSelectedPost(post))
              setOpen(true)
          }} className='cursor-pointer text-sm'>view all {post.comments.length} comments</span>
                  )
          }
          <CommentDialog open={open} setOpen={setOpen} ></CommentDialog>
          <div className='flex items-center justify-between'>
              <input type='text' value={text} onChange={changeEventHandler} placeholder='add a comment' className='outline-none w-full border border-gray-300 p-2 rounded text-sm'></input>
              {
                  text && 
              <span onClick={commentHandler} className='text-[#3badf8] cursor-pointer'>post</span>
              }
          </div>
    </div>
  )
}

export default Post
