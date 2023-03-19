import React, { useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from '../../firebase';
import { $host } from '../../http';
import { Link } from 'react-router-dom';


const AddPost = () => {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const imageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const file = imageRef.current.files[0];
    const fileName = file.name;
    const storage = getStorage(firebaseApp);
    const pathFile = `posts/${fileName}`;
    const storageRef = ref(storage, pathFile);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        $host.post("/addpost", { url: downloadURL, description: description, pathFile: pathFile })
          .then((data) => {
            console.log(data)
            setLoading(false)
            setDone(true)
          })
      })
    });
  }
  if(loading){
    return (
      <div className="loader center"></div>
    )
  }
  if(done){
    return (
      <div>
        <div className="center">
          Post has been added<br />
          <Link to='/'>Go To Home</Link>
        </div>

      </div>
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='text-align-center'>
        <div className="input-group mb-3">
        <input 
          ref={imageRef}
          type='file'
          id="inputGroupFile02"
          className='form-control'
        />
      </div>
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
        <input 
        placeholder="Description"
        id="exampleFormControlTextarea1"
        type='text'
        className='form-control'
        value={description}
        onChange={(e)=>{
          setDescription(e.target.value)
        }} /><br />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    
  )
}

export default AddPost