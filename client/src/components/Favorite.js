import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import CircularProgress from './CircularProgress'
import Loader from './Loader'

const Favorite = () => {

  const [results, setResults] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {

    setIsLoad(false)
    const getFav = async () => {
      const res = await axios.get('/likeapi/getfav/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem('token')
        }
      })

      setResults(res.data.dbres);
      setIsLoad(res.data.success);
    }

    getFav();
  }, [])
  if (!isLoad) {
    return <div className="bg-black">
      <p className=" text-poppins text-center h-100"><Loader /></p>
    </div>
  } else {


    if (results.length <= 0) {
      return (
        <>
          <Header />
          <div className="popular_movie" style={{ height: '100vh' }}>
            <h2 className="text-white text-poppins text-center">Your Favorite List is Empty Go and Make Your List!</h2>
          </div>
          <Footer />
        </>
      )
    } else {
      return (
        <>
          <Header />
          <div className="popular_movie" style={{ height: '100vh' }}>
            <div className="d-flex popular_movie_box align-items-center justify-content-center bg-black">
              <div className="row w-100 justify-content-center">
                {
                  results.map((e, index) => {
                    return (
                      <div key={index} className="col-lg-3 col-md-6 col-12 d-flex justify-content-center align-items-center">
                        <div className="cp_movie_card">
                          <NavLink to={`/infopage/${e.movieId}`}>
                            <CircularProgress percent={e.vote_average} />
                            <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="card" />
                          </NavLink>
                        </div>
                      </div>
                    )
                  }
                  )
                }
              </div>
            </div>
          </div>
          <Footer />
        </>
      )
    }
  }
}

export default Favorite