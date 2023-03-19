import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { $host } from '../../../http';
import { Link } from 'react-router-dom';


const PostItem = ({ post, handleClick }) => {
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState({})


  useEffect(() => {
    $host.post("/getuserinfo", { id: post.userId })
      .then(({data}) => {
        setUser(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  return (
    <React.Fragment>
      <div>
      <img src='../../unknown_img.jpg' alt='' width={25} height={25} style={{borderRadius: "50%"}} className='m-3' />
        <Link to={`/search/${user.username}`} className='text-decoration-none'>
          {user.username}
        </Link>
      </div>
        {loading ? (
          <SkeletonTheme 
            baseColor="#cccccc" 
            highlightColor="#fff"
          >
            <p>
              <Skeleton 
                width={400}
                height={400}
                count={1} 
              />
            </p>
          </SkeletonTheme>
        ) : (
          <img 
            src={post.url} 
            alt={post.description} 
            height="400px" 
            width="400px" 
            onClick={() => handleClick(post._id)} 
          />
        )}
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill text-danger mx-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
          {post.likes.length}<br />
          {post.description}
        </div>
      </React.Fragment>
  )
}

export default PostItem