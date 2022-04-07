import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from './CircularProgress';
import Loader from './Loader';

const List = (props) => {

    const [results, setResults] = useState([]);
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        const getData = async () => {
            let res;

            setIsLoad(true)
            if (props.id) {
                res = await axios.get(`/api/get${props.link}/${props.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            } else {
                res = await axios.get(`/api/get${props.link}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            setIsLoad(false)
            setResults(res.data);

        }

        getData();
    }, [props])

    if (results.length === 0) {
        return (
            <div className="py-1">
                <div className="cp_list_movie_container_loader py-2 d-flex justify-content-center">
                    {/* {isLoad ?  : <p className="mb-0 text-white text-center h3 text-poppins">Empty</p>} */}
                    <div className="list_loader h-100 w-100">

                    </div>
                </div>
            </div>
        )
    } else {

        return (
            <>
                <div className="py-1">
                    <div className="cp_list_movie_container py-2">
                        <span className="d-flex justify-content-between px-1 w-100">
                            <p className="mb-0 text-white h5 text-poppins ms-4">{props.type}</p>
                            <hr className="bg-white mt-0" />
                            <NavLink className="text-white text-poppins text-decoration-none" to={`/${(props.link).toLowerCase()}`}>More<ArrowForwardIosIcon /></NavLink>
                        </span>

                        <div className="list_movie_scroll">

                            {results.map((e, i) => {
                                if (e.poster_path) {

                                    return (
                                        <div className="cp_movie_card" key={i}>
                                            <NavLink to={`/infopage/${e.id}`}>
                                                <CircularProgress percent={e.vote_average} />
                                                <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} alt="card" />
                                            </NavLink>
                                        </div>
                                    )
                                }

                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default List