import React from 'react'
import loader from  '../loader.gif'

const Loader = () => {
    return (
        <div className="text-white"><img style={{ height: '4rem', width: 'auto' }} src={loader} alt="Loading..." /></div>
    )
}

export default Loader