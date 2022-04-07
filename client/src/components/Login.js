import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const Login = () => {
  const history = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleInput = (e) => {

    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    let response = await axios.post("/auth/login", JSON.stringify(data), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })

    // console.log(response);
    // showAlert(response.data.msg, response.data.signal ? 'success' : 'danger')

    if (response.data.authtoken) {
      localStorage.setItem('token', response.data.authtoken)
    }

    if (response.data.signal) {
      history('/');
    }
  }

  return (
    <>
      <Header />
      <div className="bg-dark login d-flex justify-content-center align-items-center text-poppins text-white">
        <div className="login_container flex-column">
          <p className="text-center h1">Login</p>
          <form action="" method="POST" onSubmit={formSubmit}>
            <div className="input_field">
              <input type="email" required value={data.email} onChange={handleInput} id='email' placeholder="Email" name='email' />
            </div>

            <div className="input_field">
              <input type="password" required value={data.password} onChange={handleInput} id='password' placeholder="Password" name='password' />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="my-3" style={{ fontSize: '.7rem' }}><NavLink to="/signup" className="text-decoration-none">If You have not Account! Click here</NavLink></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login