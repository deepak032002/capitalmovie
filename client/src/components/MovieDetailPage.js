import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
// import List from './List'
import Footer from './Footer'
import Loader from './Loader'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const MovieDetailPage = () => {

    const { id } = useParams();
    const [results, setResults] = useState([])
    const [reviews, setReviews] = useState([])
    const [isLike, setIsLike] = useState(false)
    const [recommendation, setRecommendation] = useState([])
    const [comment, setComment] = useState('');

    const handleLike = async (e) => {
        e.preventDefault();

        if (isLike) {
            const res = await axios.post(`/likeapi/unlike/${id}`, {}, {
                method: 'POST',
                headers: {
                    authtoken: localStorage.getItem('token')
                },
            });

            setIsLike(res.data.success)

        } else {
            const res = await axios.post(`/likeapi/doLike/${id}`, {
                poster_path: results.poster_path,
                vote_average: results.vote_average,
            }, {
                method: 'POST',
                headers: {
                    authtoken: localStorage.getItem('token')
                }
            });

            setIsLike(res.data.success)
        }
    }

    const commentSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("/comment/postComments", {
            "message": comment,
            "movieId": id,
        }, {
            method: "POST",
            headers: {
                authtoken: localStorage.getItem("token")
            }
        })

        setReviews(reviews.concat(res.data.comment))
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/getAllInfo/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const reviews_data = await axios.get(`/comment/getComments/${id}`, {
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

            const getLike = await axios.get(`/likeapi/getlike/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem('token')
                }
            });

            setIsLike(getLike.data.success);
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
            <>
                <Header />
                <div className="backdrop_image d-flex justify-content-center align-items-center text-poppins" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${results.backdrop_path})` }}>
                    <div className="row g-0 w-100">

                        <div className="col-6 justify-content-center d-none d-lg-flex">
                            <div className="movie_poster rounded-3 overflow-hidden cursor-pointer position-relative">
                                <p className={`position-absolute left-0 bottom-0 text-white text-center w-100 text-capitalize bg-${new Date(results.release_date) <= new Date() ? 'success' : 'danger'} mb-0`}>{
                                    new Date(results.release_date) <= new Date() ? 'released' : 'unreleased'
                                }</p>
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
                                    results.media_type !== 'tv' && <p className="borderBox mx-2 mb-0 releaseData text-white fs-6"><CalendarMonthIcon /> {results.release_date}</p>
                                }

                                <span className="rating borderBox mx-2 text-white d-flex justify-content-center align-items-center">
                                    <img className="mx-1" src="../images/imdb.png" alt="icon by icon8" /> {results.vote_average} ratings
                                </span>

                                <form action="" method="POST" onSubmit={handleLike}>
                                    {
                                        localStorage.getItem('token') ? <button type="submit" className="mx-2 like_button text-white cursor-pointer"> {isLike ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}</button> : <></>
                                    }
                                </form>
                            </div>
                            <p className="overview pe-lg-3 text-white">{results.overview}</p>
                        </div>
                    </div>
                </div>

                <div className="cast mt-2">
                    <p className=" my-2 text-white h5 text-poppins ms-4">Cast</p>
                    <hr className="bg-white mt-0" />
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

                <div className="video_container mt-2">
                    <p className="text-white h5 text-poppins ms-4 my-3">Videos</p>
                    <hr className="bg-white mt-0" />
                    <div className="video_box d-flex">
                        {
                            results.results.map((e, i) => {

                                if (e.type !== "Featurette") {
                                    return (
                                        <div key={i} className="iframe_box mx-2">
                                            <iframe src={`https://www.youtube.com/embed/${e.key}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    )
                                }
                                return null;

                            })
                        }
                    </div>
                </div>

                <div className="reviews mt-2 py-1 text-poppins text-white">
                    <p className="text-center h2 mt-2 fw-bolder">Reviews</p>
                    <hr className="bg-white mt-0" />

                    {
                        localStorage.getItem('token') &&
                        <form onSubmit={commentSubmit} className="commenet_text_field d-flex justify-content-center align-items-center flex-column">
                            <textarea placeholder="Comment....." name="comment_input" onChange={(e) => { setComment(e.target.value) }} id="comment" className="my-2" cols="80" rows="5"></textarea>
                            <button type="submit" className="cp_btn text-white my-2">Comment</button>
                        </form>
                    }

                    <div className="reviews_section d-flex justify-content-center align-items-center flex-column">

                        {
                            reviews.length === 0 && <p>No Reviews Available! Please Login and add Your Review.</p>
                        }

                        {
                            reviews.map((data, index) => {
                                return (
                                    <div key={index} className="review d-flex text-poppins mx-0 my-2">
                                        <img className="mx-2" src="https://img.icons8.com/color/2x/circled-user-male-skin-type-7.png" alt="profile" />
                                        <div className="text_conter border p-1 rounded">
                                            <div className="top d-flex">
                                                <p className="fw-bold mx-2">{data.user.username}</p>
                                                <em className="fw-lighter mx-2" style={{ fontSize: '.7rem' }}>{new Date(data.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</em>
                                            </div>
                                            <hr />
                                            <div className="down">
                                                <p className="text-justify">{data.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>

                <div className="recommendation">
                    {/* <List type="Movies Recommdation" id={id} link="Recommendation" /> */}
                </div>

                <Footer />
            </>
        )
    }
}

export default MovieDetailPage