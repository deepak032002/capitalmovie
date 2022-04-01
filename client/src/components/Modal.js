import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {

    const [data, setData] = useState([]);



    useEffect(() => {
        const getVideo = async () => {
            let res = await axios.get(`/api/getVideo/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // setData(res.data.results)
            setData(res.data.results.filter((e) => { return e.type === "Trailer" }));
        }
        getVideo();
    }, [props.id])

    // setFilterData(data.filter((e) => { return e.name === "Official Trailer" }));

    return (
        <div className="modal fade" id={`modal${props.id}`} tabIndex="-1" aria-labelledby="cp_modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-poppins">
                    <div className="modal-header border-bottom-0">
                        <h5 className="modal-title text-white" id="exampleModalLabel">Movie Trailer</h5>
                        <button className="modal_close_btn" type="button" data-bs-dismiss="modal" aria-label="Close"><CloseIcon /></button>
                    </div>
                    <div className="modal-body">

                        {

                            data.length > 0 ? <iframe width="100%" height="350" src={`https://www.youtube.com/embed/${data[0].key}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                : <p className="text-white text-center">Trailer not available</p>

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal