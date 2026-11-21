import React from 'react'
import Posts from './Posts'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '../hooks/useGetAllPost'
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'
const Home = () => {
    useGetAllPost()
    useGetSuggestedUsers()
  return (
        <div className='flex'>
          <div className='grow'>
              <Feed></Feed>
              <Outlet></Outlet>
          </div>
          <RightSidebar></RightSidebar>
      </div>
  )
}

export default Home