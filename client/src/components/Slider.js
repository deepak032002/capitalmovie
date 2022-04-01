import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';
import Loader from './Loader';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const Slider = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(0)

  const getPopularMovie = async () => {

    let res = await axios.get('/api/getTrendingMovie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setData(res.data.data);
  }

  useEffect(() => {
    getPopularMovie();
  }, [])

  const previousData = () => {

    if (result <= 0) {
      setResult(data.length - 1);
    } else {
      setResult(result - 1);
    }
  }

  const nextData = () => {

    if (result >= data.length - 1) {
      setResult(0);
    } else {
      setResult(result + 1);
    }
  }

  if (data.length === 0) {
    return <div className="cp_home_slider text-poppins position-relative d-flex justify-content-center align-items-center"><Loader /></div>;
  } else {
    return (
      <>
        <div className="cp_home_slider text-poppins position-relative">

          <div className="scroll_btn position-absolute w-100 d-flex justify-content-between">
            <div className="left text-white cursor-pointer" onClick={previousData}><ArrowBackIosNewIcon fontSize="large" /></div>
            <div className="right text-white cursor-pointer" onClick={nextData}><ArrowForwardIosIcon fontSize="large" /></div>
          </div>

          <div className="background_image d-flex align-items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data[result].backdrop_path})`, backgroundSize: '100vw 100vh', height: '100%', backgroundRepeat: 'no-repeat' }}>
            <div className="row g-0 w-100">

              <div className="col-6 justify-content-center d-none d-lg-flex">
                <div className="movie_poster cursor-pointer">
                  <img src={`https://image.tmdb.org/t/p/w500${data[result].poster_path}`} alt="poster_image" />
                </div>
              </div>

              <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                <p className="title text-white">{data[result].original_title || data[result].original_name}</p>
                <div className="d-flex">

                  {
                    data[result].media_type !== 'tv' && <p className="borderBox mx-2 mb-0 releaseData text-white fs-6"><NewReleasesIcon /> {data[result].release_date}</p>
                  }

                  <span className="rating borderBox mx-2 text-white d-flex justify-content-center align-items-center">
                    <img className="mx-1" src="images/imdb.png" alt="icon by icon8" /> {data[result].vote_average} ratings
                  </span>
                </div>
                <p className="overview pe-lg-3 text-white">{data[result].overview}</p>

                <div className="btns">
                  <NavLink to={`/infopage/${data[result].id}`} className="d-inline-block text-center text-white text-decoration-none mx-3">More Info</NavLink>
                  {
                    data[result].media_type !== 'tv' && <button data-bs-toggle="modal" data-bs-target={`#modal${data[result].id}`} className="text-decoration-none mx-3">Watch Trailer</button>
                  }
                </div>
              </div>
              <Modal id={data[result].id} />
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default Slider