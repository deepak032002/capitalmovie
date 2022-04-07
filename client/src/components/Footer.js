import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="cp_footer mt-2 d-flex justify-content-center flex-column">

      <div className="row w-100 align-items-center">
        <div className="col-6">
          <div className="cp_logo_wrapper d-flex align-items-center justify-content-center">
            <p className="h1 mb-0">Capital Movies</p>
          </div>
        </div>

        <div className="col-6 d-flex justify-content-center">
          <ul className="text-poppins mb-0" style={{ width: '20rem' }}>
            <li><NavLink to="#" className="text-white text-decoration-none">Privacy Policy</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="credit w-100 text-poppins">
        <hr />
        <p className="text-center m-0">All Rights Reserved © <NavLink to="#" className="text-white text-decoration-none">Capital Movies</NavLink></p>
      </div>
    </div>
  )
}

export default Footer