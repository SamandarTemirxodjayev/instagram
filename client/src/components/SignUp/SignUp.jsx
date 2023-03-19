import React, { Component } from 'react'
import { $host } from '../../http';
import { Link } from 'react-router-dom';
import { withRouter } from '../withRouter';
import Cookies from 'universal-cookie';
const cookies = new Cookies()
class SignUp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      error: ""
    }
  }
  
  setErrorMessage = (error) => {
    this.setState((state) => ({ ...state, error }));
    setTimeout(() => {
      this.setState((state) => ({ ...state, error: "" }));
    }, 6000);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, firstname, lastname, username } = this.state
      const { data }  = await $host.post("/register", { email: email, password: password, firstname: firstname, lastname: lastname, username: username })
      localStorage.setItem('id', data.id);
      localStorage.setItem('username', data.username);
      cookies.set('accessToken', data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      console.log(data)
      return window.location.href = "/";
    } catch (error) {
      this.setErrorMessage(error.response.data.error);
    }
  }
  
  handleChange = async (e) => {
    this.setState((state) => {
      return { ...state, [e.target.name]: e.target.value }
    })
    if(e.target.name === "username"){
      const val = e.target.value;
      if(/\s/.test(val)) {
        return this.setErrorMessage("Username not correct!");
      }
      this.setErrorMessage("");
      const { data }  = await $host.post("/checkuser", { username: val })
      console.log(data)
      if(data.isUserExists){
        return this.setErrorMessage("Username have in system. ");
      }
    }
  }
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={this.handleSubmit}>
        {this.state.error && (
            <div className='text-danger'>
              { this.state.error }
            </div>
          )}
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              value={this.state.firstname}
              type="text"
              name='firstname'
              onChange={this.handleChange}
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input 
            value={this.state.lastname}
            type="text"
            name='lastname'
            onChange={this.handleChange} 
            className="form-control" 
            placeholder="Last name" 
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              value={this.state.email}
              type="email"
              name='email'
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              value={this.state.username}
              type="text"
              name='username'
              onChange={this.handleChange}
              className="form-control"
              placeholder="First username"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
            value={this.state.password}
              type="password"
              name='password'
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    )
  }
}
export default withRouter(SignUp)