import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const Signup = () => {
  const history = useNavigate();

  const [data, setData] = useState({username:"", email:"", password:"", cpassword:"",});

  const handleInput = (e)=>{

    let name = e.target.name;
    let value = e.target.value;

    setData({...data, [name]: value});
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post("/auth/createUser", JSON.stringify(data), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // showAlert(response.data.msg, response.data.signal ? 'success' : 'danger')
    if (response.data.signal) {
      history('/login');
    }
  }

  return (
    <>
      <Header />
      <div className="bg-dark login d-flex justify-content-center align-items-center text-poppins text-white">
        <div className="login_container flex-column">
          <p className="text-center h1">Sign Up</p>
          <form action="" method="POST" onSubmit={formSubmit}>
            <div className="input_field">
              <input type="text" required value={data.name} onChange={handleInput} id='name' placeholder="Name" name='username' />
            </div>
            <div className="input_field">
              <input type="email" required value={data.email} onChange={handleInput} id='email' placeholder="Email" name='email' />
            </div>

            <div className="input_field">
              <input type="password" required value={data.password} onChange={handleInput} id='password' placeholder="Password" name='password' />
            </div>

            <div className="input_field">
              <input type="password" required value={data.cpassword} onChange={handleInput} id='cpassword' placeholder="Current Password" name='cpassword' />
            </div>
            <button type="submit">Sign UP</button>
          </form>
          <p className="my-3" style={{ fontSize: '.7rem' }}><NavLink to="/login" className="text-decoration-none">If You have Account! Click Here</NavLink></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup