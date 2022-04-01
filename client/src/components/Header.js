import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login')
  }


  return (
    <div className="cp_header d-flex align-items-center justify-content-between">
      {/* Logo */}
      <div className="cp_logo_wrapper d-flex align-items-center">
        <p className="h1 mb-0"><NavLink to="/discover" style={{ color: 'red' }} className="text-decoration-none">Capital Movies</NavLink></p>
      </div>

      <div className="cp_tab_wrapper d-flex align-items-center">
        <ul className="d-flex align-items-center mb-0 mx-2">
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/discover/popular">Popular</NavLink></li>
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/discover/toprated">Top Rated</NavLink></li>
          <li><NavLink className=" mx-2 text-decoration-none text-poppins text-white" to="/discover/upcoming">Upcomings</NavLink></li>
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
  )
}

export default Header