import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headeropenclose, setHeaderopenclose] = useState('header_close');
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login')
  }

  const handleMenu = () => {
    if (isMenuOpen) {
      setHeaderopenclose('header_close')
      setIsMenuOpen(false)
    }
    else {
      setHeaderopenclose('py-2 header_open')
      setIsMenuOpen(true)
    }
  }
  return (
    <>
      <div className="cp_header d-flex align-items-center justify-content-between px-2 px-md-0">
        {/* Logo */}
        <div className="cp_logo_wrapper d-flex align-items-center">
          <p className="h1 mb-0"><NavLink to="/" style={{ color: 'red' }} className="text-decoration-none">Capital Movies</NavLink></p>
        </div>

        <div className="cp_tab_wrapper flex-column d-flex align-items-center">

          <div className="d-md-none d-block cursor-pointer"><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/search"><SearchIcon sx={{ fontSize: 25 }} /></NavLink><MenuIcon sx={{ fontSize: 30 }} onClick={handleMenu} /></div>

          <ul className="d-md-flex d-none align-items-center mb-0 mx-2">
            <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/popular">Popular</NavLink></li>
            <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/toprated">Top Rated</NavLink></li>
            <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/upcoming">Upcomings</NavLink></li>
            <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/search"><SearchIcon /></NavLink></li>

            {
              localStorage.getItem('token')
                ?
                <>
                  <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/discover/favourites">Favourite</NavLink></li>
                  <li><button onClick={handleLogout} className=" mx-2 btn btn-danger text-decoration-none text-poppins text-white">Logout</button></li>
                </>
                : <li><NavLink className=" mx-2 btn btn-success text-decoration-none text-poppins text-white" to="/login">Login</NavLink></li>
            }
          </ul>
        </div>

      </div>

      <div className={`cp_mobile_menu d-flex flex-column justify-content-center align-items-center d-md-none fs-4 text-center ${headeropenclose} `}>
        <ul className="m-0 p-0">
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/popular">Popular</NavLink></li>
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/toprated">Top Rated</NavLink></li>
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/upcoming">Upcomings</NavLink></li>
        </ul>

        {
          localStorage.getItem('token')
            ?
            <>
              <><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/discover/favourites">Favourite</NavLink></>
              <><button onClick={handleLogout} className=" mx-2 w-50 btn btn-danger text-decoration-none text-poppins text-white fs-4">Logout</button></>
            </>
            : <><NavLink className=" mx-2 w-50 btn btn-success text-decoration-none text-poppins text-white fs-4" to="/login">Login</NavLink></>
        }
      </div>
    </>
  )
}

export default Header