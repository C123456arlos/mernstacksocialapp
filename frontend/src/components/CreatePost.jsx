import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"
import {Textarea} from './ui/textarea'
import { useState } from "react"
import {Loader2} from 'lucide-react'
import { readFileAsDataURL } from "../lib/utils"
import { toast } from 'sonner'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setPosts } from "../redux/postSlice"
const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef()
    const [file, setFile] = useState('')
    const [caption, setCaption] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    console.log('user', user)
    const {posts}= useSelector(store=>store.post)
    const dispatch= useDispatch()
    const fileChangeHandler = async(e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
            const dataUrl = await readFileAsDataURL(file)
            setImagePreview(dataUrl)
    }    
    }
    const createPostHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('caption', caption)
        if(imagePreview) formData.append('image', file)
        try {
            setLoading(true)
            const res = await axios.post('https://mernstacksocialapp.onrender.com/api/v1/post/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
  return (
      <Dialog open={open}>
          <DialogContent onInteractOutside={() => setOpen(false)}>
              <DialogHeader className="text-center font-semibold">create new post</DialogHeader>
              <div className="flex gap-3 items-center">
                  <Avatar>
                      <AvatarImage src={user?.profilePicture} alt='img'></AvatarImage>
                      <AvatarFallback>app</AvatarFallback>
                  </Avatar>
                  <div>
                      <h1 className="font-semibold text-xs">{user?.username}</h1>
                      <span className="text-gray-600 text-xs">bio here</span>
                  </div>
              </div>
              <Textarea value={caption} onChange={(e)=>setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder='write a caption'></Textarea>
              {imagePreview && (
                  <div className="w-full h-64 flex items-center justify-center">
                      <img src={imagePreview} className="object-cover h-full w-full rounded-md" alt="preview img"></img>
                  </div>
              )}
              <Input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler}></Input>
              <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto hover:bg-[#258bcf] bg-[#0095f6]">select from computer</Button>
              {
                  imagePreview && (
                      loading? (  <Button><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>please wait</Button>):(<Button onClick={createPostHandler} type="submit" className="w-full">post</Button>)
             
             ) }
          </DialogContent>
    </Dialog>
  )
}

export default CreatePost