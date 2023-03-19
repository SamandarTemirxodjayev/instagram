import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link, useParams } from 'react-router-dom'
import { $host } from '../../http';

const Profile = () => {
  const { username } = useParams();
  const [ user, setUser ] = useState({});
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ inputValue, setInputValue ] = useState('Follow')

  const fetchUserData = async () => {
    Promise.allSettled([
      $host.post('/getuserbyusername', {username: username} ),
      $host.get(`/getposts/${username}`)
    ])
    .then(([ userData, postData ]) => {
      setUser(userData.value.data);
      console.log(userData.value.data.follow)
      if (userData.value.data.follow.includes(localStorage.getItem('id'))) {
        setInputValue('UNFOLLOW')
      } else {
        setInputValue('FOLLOW')
      }
      setPosts(postData.value.data.posts);
      setLoading(false)
    });
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  if(loading){
    return (
      <div className="loader center"></div>
    )
  }
  const handlerClick = async (e) =>{
    e.preventDefault()
    const {data} = await $host.post('/follow', {username: username})
    console.log(data)
  }
  if(username != localStorage.getItem('username')){
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <div className="d-flex py-4">
            <div>
              <label htmlFor="file-upload">
                <img src="../unknown_img.jpg" alt="Your Photo" width='100px' height='100px' className='rounded-circle' />
              </label>
              <input id="file-upload" type="file" style={{display: "none"}} />
            </div>
              <div className="d-flex align-items-center">
                <h1 className='m-0 px-2'>{username}</h1>
              </div>
              <input type="submit" className="btn btn-primary m-4" style={{height: "50%"}} value={inputValue} onClick={handlerClick} />
            </div>
            <div className='d-flex '>
              <Link to={`/follows/${user.username}`} className='text-decoration-none text-black'><h3 className='px-2'>{user.followers.length} Follows</h3></Link>
              <Link to={`/followers/${user.username}`} className='text-decoration-none text-black'><h3 className='px-2'>{user.follow.length} Followers</h3></Link>
              <h3 className='px-2'>{posts.length} Posts</h3>
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-center'>
              Posts
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)"
              }}
            >
              {posts.map(post => (
                <div className='p-2 hovereffect' key={post._id}>
                  <img src={post.url} alt="key" height={200} width={200}  />
                  <div className="likes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill text-danger mx-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                    {post.likes.length}
                  </div>
                </div> 
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <div className="d-flex py-4">
            <div>
              <label htmlFor="file-upload">
                <img src="../unknown_img.jpg" alt="Your Photo" width='100px' height='100px' className='rounded-circle' />
              </label>
              <input id="file-upload" type="file" style={{display: "none"}} />
            </div>
              <div className="d-flex align-items-center">
                <h1 className='m-0 px-2'>{user.username}</h1>
                <Link to="/settings" className='text-decoration-none color-white m-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-wide" viewBox="0 0 16 16">
                    <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z"/>
                  </svg>
                </Link>
              </div>
            </div>
            <div className='d-flex '>
            <Link to={`/follows/${user.username}`} className='text-decoration-none text-black'><h3 className='px-2'>{user.followers.length} Follows</h3></Link>
              <Link to={`/followers/${user.username}`} className='text-decoration-none text-black'><h3 className='px-2'>{user.follow.length} Followers</h3></Link>
              <h3 className='px-2'>{posts.length} Posts</h3>
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-center'>
              Posts
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)"
              }}
            >
              {posts.map(post => (
                <div className='p-2 hovereffect' key={post._id}>
                  <img src={post.url} alt="key" height={200} width={200}  />
                  <div className="likes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill text-danger mx-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                    {post.likes.length}
                  </div>
                </div> 
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  }
  
export default Profile