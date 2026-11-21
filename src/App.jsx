import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {io} from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/realTimeNotificationsSlice'
import ProtectedRoutes from './components/ProtectedRoutes'

const browserRouter = createBrowserRouter([
  {
  path: '/',
  element:<ProtectedRoutes><MainLayout></MainLayout></ProtectedRoutes>,
  children: [
    {
      path: '/',
      element:<Home></Home>
    },
    {
      path: '/profile/:id',
      element:<Profile></Profile>
    },
    {
      path: '/account/edit',
      element:<EditProfile></EditProfile>
    },
    {
      path: '/chat',
      element:<ChatPage></ChatPage>
    }
  ]
  }, {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element:<Signup></Signup>
  }
])

function App() {
  const { user } = useSelector(store => store.auth)
  const {socket}=useSelector(store=>store.socketio)
  const dispatch= useDispatch()
  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: { userId: user?._id },
        transports: ['websocket']
      })
      dispatch(setSocket(socketio))
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification))
      })
      return () => {
        socketio.close()
        dispatch(setSocket(null))
      }
    } else if(socket){
      socket?.close()
      dispatch(setSocket(null))
  }
  }, [user, dispatch])
  
  return (
    <>
    <RouterProvider router={browserRouter}></RouterProvider>
    </>
  )
}

export default App
