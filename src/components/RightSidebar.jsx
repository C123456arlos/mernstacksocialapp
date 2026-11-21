import React from 'react'
import SuggestedUsers from './SuggestedUsers'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const RightSidebar = () => {
  const {user}= useSelector(store=>store.auth)
  return (

    <div className='w-fit my-10 justify-between'>
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
              <AvatarImage src={user?.profilePicture}></AvatarImage>
              <AvatarFallback>app</AvatarFallback>
                  </Avatar>
        </Link>
          <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>perosn</Link></h1>
          <span className='text-gray-600 text-sm'>{user?.bio ||'bio here...'}</span>
                  </div>
      </div>
      <SuggestedUsers></SuggestedUsers>
    </div>
  )
}

export default RightSidebar