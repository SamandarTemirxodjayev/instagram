import React, { useEffect, useState } from 'react'
import Router from './router'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const [backendData, setBackendData] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get('http://localhost:5000/api')
      .then(function ({ data }) {
        setBackendData(data.name)
        setLoading(false)
      }).catch(error => {
        console.error(error);
      });
  }, [])
  if (loading) {
    return (
      <div className='loader center'></div>
    )
  }
  return <Router>
    <div className="App">
      {backendData}
    </div>
  </Router>
}

export default App