import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SuggestedUsers = () => {
    const {suggestedUsers}= useSelector(store=>store.auth)
  return (
      <div className='my-10'>
          <div className='flex items-center justify-between text-sm'>
              <h1 className='font-semibold text-gray-600'>suggested for you</h1>
              <span className='font-medium cursor-pointer'>see all</span>
          </div>
          {
              suggestedUsers.map((user) => {
                  return (
                      <div key={user._id} className='flex items-center justify-between my-5'>
                          <div className='flex items-center gap-2'>
                              
                          <Link to={`/profile/${user?._id}`}>
          <Avatar>
              <AvatarImage src={user?.profilePicture}></AvatarImage>
              <AvatarFallback>app</AvatarFallback>
                  </Avatar>
        </Link>
          <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-600  text-sm'>{user?.bio ||'bio here...'}</span>
                              </div>
                      </div>
                          <span className='text-[#3baddf] text-xs font-bold cursor-pointer
                          hover:text-[#3495d6]'>follow</span>
                          </div>
                  )
              })
        }
    </div>
  )
}

export default SuggestedUsers