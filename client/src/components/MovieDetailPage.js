import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import List from './List'
import Footer from './Footer'
import Loader from './Loader'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const MovieDetailPage = () => {

    const { id } = useParams();
    const [results, setResults] = useState([])
    const [reviews, setReviews] = useState([])
    const [isLike, setIsLike] = useState(false)
    const [recommendation, setRecommendation] = useState([])

    const handleLike = async () => {

        const data = {
            id: id
        }

        if (isLike) {

            const res = await axios.post(`/api/unlike/${id}`, JSON.stringify(data), {
                methods: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setIsLike(res.data.like)

        } else {
            const res = await axios.post(`/api/like/${id}`, {
                methods: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLike(res.data.like)
        }


        // console.log(res.data);
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/getAllInfo/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const reviews_data = await axios.get(`/api/getReviews/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const recommendation_data = await axios.get(`/api/getRecommendation/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const getLike = await axios.get(`/api/getlike/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setIsLike(getLike.data.like);
            setResults(res.data);
            setReviews(reviews_data.data);
            setRecommendation(recommendation_data.data);
        }

        getData();
    }, [id]);

    if (results.length === 0 && reviews.length === 0 && recommendation.length === 0) {
        return <div className="bg-black">
            <p className=" text-poppins text-center h-100"><Loader /></p>
        </div>
    } else {
        return (
            <div className="bg-black">
                <Header />
                <div className="backdrop_image d-flex justify-content-center align-items-center text-poppins" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${results.backdrop_path})`, backgroundSize: '100vw 100vh', height: 'calc(100vh - 3rem)', backgroundRepeat: 'no-repeat' }}>
                    <div className="row g-0 w-100">

                        <div className="col-6 justify-content-center d-none d-lg-flex">
                            <div className="movie_poster rounded-3 overflow-hidden cursor-pointer position-relative">
                                <p className="position-absolute left-0 bottom-0 text-white text-center w-100 text-capitalize bg-success mb-0">released</p>
                                <img src={`https://image.tmdb.org/t/p/w500${results.poster_path}`} alt="poster_image" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center align-items-lg-start flex-column">
                            <p className="title text-white">{results.original_title || results.original_name}</p>

                            <div className="genere d-flex">
                                {
                                    results.genres.map((e, i) => {
                                        return (
                                            <p key={i} className="borderBox mx-2 text-white">{e.name}</p>
                                        )
                                    })
                                }
                            </div>

                            <div className="d-flex my-2">

                                {
                                    results.media_type !== 'tv' && <p className="borderBox mx-2 mb-0 releaseData text-white fs-6"><NewReleasesIcon /> {results.release_date}</p>
                                }

                                <span className="rating borderBox mx-2 text-white d-flex justify-content-center align-items-center">
                                    <img className="mx-1" src="../images/imdb.png" alt="icon by icon8" /> {results.vote_average} ratings
                                </span>

                               {
                                    localStorage.getItem('token') ? <button onClick={handleLike} className="mx-2 like_button text-white cursor-pointer"> {isLike ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}</button> : <></>
                               } 
                            </div>
                            <p className="overview pe-lg-3 text-white">{results.overview}</p>
                        </div>
                    </div>
                </div>

                <div className="cast my-2">
                    <p className="mb-0 text-white h5 text-poppins ms-4">Cast</p>
                    <div className="cast_list w-100 d-flex">
                        {
                            results.credits.cast.map((e, i) => {

                                if (e.known_for_department === 'Acting' && e.profile_path !== null) {
                                    return (
                                        <div key={i} className="cast_card position-relative">
                                            <div className="overlay position-absolute h-100 w-100 d-flex flex-column justify-content-center align-items-center text-white">
                                                <p className="mb-0 h5">{e.original_name}</p>
                                            </div>
                                            <img src={`https://image.tmdb.org/t/p/w500${e.profile_path}`} alt="profile of cast" />
                                        </div>
                                    )
                                }

                                return null

                            })
                        }
                    </div>
                </div>

                <div className="video_container my-2">
                    <p className="text-white h5 text-poppins ms-4 my-3">Videos</p>
                    <div className="video_box d-flex">
                        {
                            results.results.map((e, i) => {

                                if (e.type !== "Featurette") {
                                    return (
                                        <div key={i} className="iframe_box mx-2">
                                            <iframe width="450" height="350" src={`https://www.youtube.com/embed/${e.key}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    )
                                }
                                return null;

                            })
                        }
                    </div>
                </div>

                <div className="reviews text-poppins text-white">
                    <p className="text-center h2 my-3 fw-bolder">Reviews</p>

                    {
                        reviews.map((review, i) => {
                            const url = `${review.author_details.avatar_path}`

                            return (
                                <div key={i} className="review_container my-3 p-2 mx-4">
                                    <p className="author"><img className="profile mx-1" src={url.substring(1, url.length - 1)} alt="" />{review.author}</p>
                                    <p className="content text-capitalize">{review.content}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="recommendation">
                    <List type="Movies Recommdation" id={id} link="Recommendation" />
                </div>
                <Footer />
            </div>
        )
    }
}

export default MovieDetailPage