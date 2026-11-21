import { useSelector } from "react-redux"
import Post from "./Post"

const Posts = () => {
  const { posts } = useSelector(store => store.post)
  return (
      <div>
          {   
        posts.map((post)=><Post key={post._id} post={post}></Post>)
          }
    </div>
  )
}

export default Posts