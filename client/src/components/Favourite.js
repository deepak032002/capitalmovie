// import React, { useState } from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import axios from 'axios'
// // import Loader from './Loader'

// const Favourite = () => {

//     const [data, setData] = useState([])
//     // const [isLoad, setIsLoad] = useState(false)
//     // const [movieData, setMovieData] = useState([])

//     // const getmovie = async (e) => {
//     //     const res = await axios.get(`/api/getAllInfo/${e.id}`, {
//     //         method: 'GET',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         }
//     //     });
//     //     console.log(data, res.data);
//     //     setData(data.concat(res.data.results));
//     // }

//     // useEffect(() => {

//     //     const getData = async () => {

//     //         setIsLoad(true)
//     //         const res = await axios.get('/api/getfav', {
//     //             method: 'GET',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         })

//     //         res.data.data.map((e, i) => {
//     //             getmovie(e)
//     //         })

//     //         setIsLoad(false);
//     //     }

//     //     getData()

//     // }, [])

//     return (
//         <>
//             <Header />
//             <div className="favourite_container bg-dark text-poppins">
//                 <p className="h3 m-0 text-decoration-underline text-center text-capitalize text-white">Favourite</p>
//                 <div className="row">
//                     {/* {
//                         isLoad ?
//                             <p><Loader /></p>
//                             :
//                             data.map((e) => {

//                             })
//                     } */}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Favourite

import React from 'react'

const Favourite = () => {
  return (
    <div>Favourite</div>
  )
}

export default Favourite