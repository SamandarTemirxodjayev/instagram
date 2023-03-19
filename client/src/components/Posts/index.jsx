import React, { useState, useEffect, useRef } from 'react'
import { $host } from '../../http'
import PostItem from './components/PostItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const clicksRef = useRef(0);
  const timerRef = useRef(null);

  const handleClick = async (postId) => {
    clicksRef.current++;

    if (clicksRef.current === 1) {
      timerRef.current = setTimeout(() => {
        clicksRef.current = 0;
      }, 300);
    } else if (clicksRef.current === 2) {
      clearTimeout(timerRef.current);
      const { data } = await $host.post("/addlike", { postId });
      if(data.like == null){
        setPosts(prev => prev.map((item => item._id === postId ? { ...item, likes: item.likes.filter(like => {
          return like.userId !== localStorage.getItem("id") 
        }) } : item)));
        clicksRef.current = 0;
        return
      }
      setPosts(prev => prev.map((item => item._id === postId ? { ...item, likes: [...item.likes, data.like] } : item)));
      clicksRef.current = 0;
      return;
    }
  };
  useEffect(() => {
    $host.get("/getposts")
      .then((response) => {
        setPosts(response.data.posts)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className=''>
      {posts.map((post, key) => (
        <div key={key}>
          <PostItem 
            key={post._id}
            handleClick={handleClick}
            post={post}
          />
        </div>
      ))}
    </div>
  )
}

export default Posts
