import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CircularProgress from './CircularProgress'
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader'

const Upcoming = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [results, setResults] = useState([])

    const getData = async () => {
        console.log('called getData');

        if (page >= 500) {
            setHasMore(false);
            return;
        }

        const res = await axios.get(`/api/getCompleteUpcomingList`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'page': page,
            }
        })

        setResults(results.concat(res.data))
        setPage(page + 1);
    }

    useEffect(() => {

        const firstData = async () => {
            const res = await axios.get(`/api/getCompleteUpcomingList`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'page': page,
                }
            })
            setResults(res.data)
            setPage(page + 1);
        }

        firstData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Header />
            <div className="popular_movie">
                <div className="d-flex popular_movie_box align-items-center justify-content-center bg-black">

                    <InfiniteScroll
                        dataLength={results.length}
                        next={getData}
                        hasMore={hasMore}
                        loader={<p className="my-3 text-center"><Loader /></p>}
                        endMessage={
                            <p className="text-white text-poppins" style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        className="row align-items-center justify-content-center"
                    >
                        {
                            results.map((e, i) => {

                                if (e.poster_path) {
                                    return (
                                        <>
                                            <div key={i} className="col-lg-3 col-md-6 col-12 d-flex justify-content-center align-items-center">
                                                <div className="cp_movie_card">
                                                    <NavLink to={`/infopage/${e.id}`}>
                                                        <CircularProgress percent={e.vote_average} />
                                                        <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="card" />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else{
                                    return null
                                }
                            })
                        }
                    </InfiniteScroll>
                </div>
            </div>
            <Footer />
        </>
    )
    // }
}

export default Upcoming