import React, { useState } from 'react'
import SideBar from '../SideBar'
import { $host } from '../../http'

const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [input, setInput] = useState({currentPass: '', newPass: ''})
  
  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault()
    try {
      const user = await $host.post("/edituser", input)
      console.log(user)
    } catch (error) {
      setError(error.response.data.error)
    }
    setLoading(false)
  }

  function handleChange(e) {
    setInput(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  if(loading){
    return (
      <div className="loader center"></div>
    )
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center" style={{height: "75vh"}}>
        <div>
          <h1>Settings</h1>
          <div className="text-danger">{error}</div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Enter you current passowrd</label>
                <input 
                  value={input.currentPass}
                  onChange={handleChange}
                  type="password" 
                  className="form-control" 
                  name="currentPass"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Enter new passowrd</label>
                <input 
                  value={input.newPass}
                  onChange={handleChange}
                  type="password" 
                  className="form-control" 
                  name='newPass'
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings