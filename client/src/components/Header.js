import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import $ from 'jquery'

const Header = () => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login')
  }

  $(window).on('scroll', () => {
    const st = $(window).scrollTop();
    const height = $('.cp_header').height();

    if (st >= height) {
      $('.cp_header').css({ 'background-color': '#242424', 'transition': '.3s' })
    } else {
      $('.cp_header').css({ 'background-color': 'transparent', 'transition': '.3s' })
    }
  })

  return (
    <>
      <header className="cp_header py-1 p-1">
        <div className="row g-0 align-items-center h-100 w-100">
          <div className="col-6 d-flex align-items-center">
            <NavLink to="/" className="cp_logo_wrapper my-0 ms-2 text-decoration-none">Capital Movies</NavLink>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-end">
            <input type="checkbox" className="d-none" id="menu_trigger_btn" />
            <label for="menu_trigger_btn" className="d-lg-none text-white cursor-pointer"><MenuIcon sx={{ fontSize: '2.5rem' }} /></label>

            <div className="list_wrapper text-poppins me-2">
              <ul className="p-0 m-0">
                <li className="mx-lg-3 d-flex align-items-center">
                  <NavLink className="text-white text-decoration-none" to="/popular">Popular</NavLink>
                </li>
                <li className="mx-lg-3 d-flex align-items-center">
                  <NavLink className="text-white text-decoration-none" to="/toprated">Top Rated</NavLink>
                </li>
                <li className="mx-lg-3 d-flex align-items-center">
                  <NavLink className="text-white text-decoration-none" to="/upcoming">Up Comings</NavLink>
                </li>
                <li className="mx-lg-3 d-flex align-items-center">
                  <NavLink to="/search" className="text-white"><SearchIcon /></NavLink>
                </li>
                {
                  localStorage.getItem('token') ? <>
                    <li className="mx-lg-3 d-flex align-items-center">
                      <NavLink className="text-white text-decoration-none" to="/favorite">Favorites</NavLink>
                    </li>
                    <li className="mx-lg-3 d-flex align-items-center">
                      <button className="text-white cp_btn" onClick={handleLogout}>Log Out <LogoutIcon /></button>
                    </li>
                  </> :
                    <li className="mx-lg-3 d-flex align-items-center">
                      <NavLink to="/login" className="text-white cp_btn text-decoration-none text-center">Log In <LoginIcon /></NavLink>
                    </li>
                }
              </ul>
            </div>

          </div>
        </div>
      </header>
    </>
  )
}

export default Header