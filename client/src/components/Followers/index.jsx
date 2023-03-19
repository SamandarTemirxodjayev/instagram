import React, { useEffect, useState } from 'react'
import { $host } from '../../http';
import { Link, useParams } from 'react-router-dom';

const Followers = () => {
  const [ loading, setLoading] = useState(true)
  const { username } = useParams();
  const [ follows, setFollows ] = useState([])
  async function fetchAllFollows(){
    try {
      const  {data}  = await $host.post('/getallFollows', {username: username});
      const followersData = await Promise.all(data.map(async (followerId) => {
        const { data } = await $host.post(`/getuserinfo/`, {id: followerId});
        return data;
      }));
      const followersUsernames = followersData.map((followerData) => followerData.username);
      setFollows(followersUsernames);
      console.log(followersUsernames);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAllFollows();
  }, [])
  if(loading){
    return (
      <div className="loader center"></div>
    )
  }
  return (
    <div className="container">
      <div className='d-flex align-items-center justify-content-center' style={{marginTop: "75px"}}>
      {follows.length == 0 && (  
          <h1>User Not Have Followers &#x1F928;</h1>
          )}

          {follows.length != 0 && (  
          <div className="">
              { follows.map((value, key) =>(
                <p key={key}>
                  <img src='../../unknown_img.jpg' alt='' width={50} height={50} style={{borderRadius: "50%"}} />
                  <Link to={`/search/${value}`} className='m-2 text-decoration-none'>{value}</Link>
                </p>
              )) }
          </div>
          )}
    </div>
    </div>
  )
}

export default Followers