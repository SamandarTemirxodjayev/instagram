import React, { useState, useEffect } from 'react'
import { $host } from '../../http'
import { Link } from 'react-router-dom'

const Search = () => {
  const [ search, setSearch ] = useState('')
  const [ values, setValues ] = useState([])
  const [ filteredData, setFilteredData ] = useState([])
  
  function filterItems(arr, query) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  }
    

  async function fetchAllUsernames(){
    try {
      const  data  = await $host.post('/getallusername');
      setValues(data)
      console.log(filterItems(data.data, search));
      setFilteredData(filterItems(data.data, search))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllUsernames();
  }, [])

  function handleChange(e){
    setSearch(e.target.value)
    setFilteredData(filterItems(values.data, e.target.value))
  }
  
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <form>
        <div className="mb-3">
          <input 
            type="email"
            className="form-control" 
            placeholder="Search UserName"
            onChange={handleChange}
          />
          {filteredData.length == 0 && (  
          <h1>User Not Found &#x1F928;</h1>
          )}

          {filteredData.length != 0 && (  
          <div className="">
              { filteredData.map((value, key) =>(
                <p key={key}>
                  <img src='../../unknown_img.jpg' alt='' width={50} height={50} style={{borderRadius: "50%"}} />
                  <Link to={`/search/${value}`} className='m-2 text-decoration-none'>{value}</Link>
                </p>
              )) }
          </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Search
