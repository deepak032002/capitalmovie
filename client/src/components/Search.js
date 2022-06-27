import React, { useState } from 'react'
import Header from './Header'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import CircularProgress from './CircularProgress'
import Loader from './Loader'

const Search = () => {

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const [isLoad, setIsLoad] = useState(false);
    const [data, setData] = useState({ results: [] })

    const fetchData = async (e) => {
        e.preventDefault();
        setIsLoad(true)
        const res = await axios.get('/api/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                query: query.trim().split(" ").join("+"),
                page: page
            }
        })
        setIsLoad(false)
        setData(res.data);
        setPage(page + 1);
    }
    return (
        <>
            <div className="search_container bg-dark">
                <Header />
                <div className="searchbar">
                    <form method='GET' onSubmit={fetchData}>
                        <div className="wrapper">
                            <input type="text" autocomplete="off" name="search" onChange={(e) => { setQuery(e.target.value) }} placeholder="Search Your Movies..." />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="search_result text-white">
                        {
                            isLoad ? <p className="text-center h4"><Loader /></p> :
                                <>
                                    {
                                        data.results.length === 0 ? <p className="text-center text-white text-poppins h3">Nothing Here Search....</p> :
                                            <>
                                                <div className="row">
                                                    {
                                                        data.results.map((e, i) => {
                                                            if (e.backdrop_path !== null) {
                                                                return (
                                                                    <>
                                                                        <div key={i} className="col-lg-3 col-md-6 col-12 d-flex justify-content-center align-items-center">
                                                                            <div className="cp_search_movie_card">
                                                                                <NavLink to={`/infopage/${e.id}`}>
                                                                                    <CircularProgress percent={e.vote_average} />
                                                                                    <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="card" />
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Search