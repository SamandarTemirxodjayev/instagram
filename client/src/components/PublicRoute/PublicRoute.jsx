import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("accessToken")
  // const user = cookies.get('accessToken');
  if(user){
    return <Navigate to={"/"} replace={true} />
  }
  return ( children )
}

export default PublicRoute