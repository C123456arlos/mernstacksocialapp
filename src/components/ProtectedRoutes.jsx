import React, { useEffect } from 'react'
import { setSelectedPost } from '../redux/postSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const { user } = useSelector(store => store.auth)
    const navigate= useNavigate()
    useEffect(() => {
        if (!user) {
           navigate('/login')
       } 
    },[])
    return <>{children}</>
}

export default ProtectedRoutes