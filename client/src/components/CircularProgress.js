import React from 'react'

const CircularProgress = (props) => {
    return (
        <>
            <div className="cp_circular_box">
                <div className="outer_ring" style={{ backgroundImage: `conic-gradient(red ${props.percent}, #00ccff 0%)` }}>
                    <div className="center_cover">
                        <h6 className="m-0 text-poppins">{props.percent}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CircularProgress