import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import '../Swiper.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";



const Slider = () => {
  const [data, setData] = useState([]);
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

  if (data.length === 0) {
    return <div className="cp_home_slider slider_loading text-poppins position-relative d-flex justify-content-center align-items-center"></div>;
  } else {
    return (
      <>
        <Swiper

          pagination={{
            dynamicBullets: true,
          }}

          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          className="swiper_container"
        >
          {
            data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="cp_home_slider text-poppins position-relative">
                    <div className="background_image d-flex align-items-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}>
                      <div className="row g-0 w-100">

                        <div className="col-6 justify-content-center d-none d-lg-flex">
                          <div className="movie_poster cursor-pointer">
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="poster_image" />
                          </div>
                        </div>

                        <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                          <p className="title text-white">{item.original_title || item.original_name}</p>
                          <div className="d-flex">

                            {
                              item.media_type !== 'tv' && <p className="borderBox mx-2 mb-0 releaseData text-white fs-6"><NewReleasesIcon /> {item.release_date}</p>
                            }

                            <span className="rating borderBox mx-2 text-white d-flex justify-content-center align-items-center">
                              <img className="mx-1 img-fluid" src="images/imdb.png" alt="icon by icon8" /> {item.vote_average} ratings
                            </span>
                          </div>
                          <p className="overview pe-lg-3 text-white">{item.overview}</p>

                          <div className="btns">
                            <NavLink to={`/infopage/${item.id}`} className="d-inline-block text-center text-white text-decoration-none mx-3">More Info</NavLink>
                            {
                              item.media_type !== 'tv' && <button data-bs-toggle="modal" data-bs-target={`#modal${item.id}`} className="text-decoration-none mx-3">Watch Trailer</button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

              )
            })
          }
        </Swiper>



      </>
    )
  }
}

export default Slider