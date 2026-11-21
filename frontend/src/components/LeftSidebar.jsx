import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {Popover, PopoverContent, PopoverTrigger} from './ui/popover'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/authSlice'
import { useState } from 'react'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '../redux/postSlice'
import { Button } from './ui/button'
const LeftSidebar = () => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const {likeNotification}= useSelector(store=>store.realTimeNotification)
    const dispatch = useDispatch()
    const [open, setOpen]= useState(false)
    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://mernstacksocialapp.onrender.com/api/v1/user/logout', { withCredentials: true })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                dispatch(setSelectedPost(null))
                dispatch(setPosts([]))
                navigate('/login')            
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const sidebarHandler = (textType) => {
        if (textType === 'logout') {
            logoutHandler()
        } else if (textType === 'create') {
            setOpen(true)
        } else if
            (textType === 'profile') {
            navigate(`/profile/${user?._id}`)
        } else if (textType === 'home') {
            navigate('/')
        } else if (textType === 'messages') {
            navigate('/chat')
        }
        

    }
    const sidebarItems = [
    { icon: <Home></Home>, text: 'home' },
    { icon: <Search></Search>, text: 'search' },
    { icon: <TrendingUp></TrendingUp>, text: 'explore' },
    { icon: <MessageCircle></MessageCircle>, text: 'messages' },
    { icon: <Heart></Heart>, text: 'notifications' },
    { icon: <PlusSquare></PlusSquare>, text: 'create' },
    {icon: (
    <Avatar className='w-6 h-6'>
  <AvatarImage src={user?.profilePicture} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    ), text: 'profile'
    },
    {icon:<LogOut></LogOut>, text:'logout'}
]
  return (
      <div className='fixed top-0 x-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
          <div className='flex flex-col'>
              <h1 className='my-8 pt-3 font-bold text-xl'>logo</h1>
              <div className=''>
                  
              {sidebarItems.map((item,index) => {
              return (
                  <div onClick={()=>sidebarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                      {item.icon}<span>{item.text}</span>
                      {
                          item.text === 'notifications' && likeNotification.length > 0 && (
                              <Popover>
                                  <PopoverTrigger asChild>
                                          <Button size='icon' className='rounded-full h-5 w-5 bg-red-500 absolute bottom-6 left-6 hover:bg-red-600'>{likeNotification.length}</Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                      <div>
                                          {
                                              likeNotification.length === 0 ? (<p>no new notification</p>) :
                                                  (likeNotification.map((notification) => {
                                                      return (
                                                          <div key={notification.userId} className='flex  items-center gap-2 my-2'>
                                                              <Avatar>
                                                                  <AvatarImage src={notification.userDetails?.profilePicture}></AvatarImage>
                                                                  <AvatarFallback>app</AvatarFallback>
                                                              </Avatar>
                                                              <p className='text-sm'>
                                                                  <span className='font-bold'
                                                                >{notification.userDetails?.username}</span>  liked your post</p>
                                                          </div>
                                                      )
                                                  }))
                                          }
                                      </div>
                                  </PopoverContent>
                            </Popover>  
                      )    
                      }
                  </div>
              )
          })}
          </div>
          </div>
          <CreatePost open={open} setOpen={setOpen}></CreatePost>
    </div>
  )
}
export default LeftSidebar
