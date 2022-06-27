const express = require('express');
const router = express.Router();
const axios = require('axios')
const Id = require('../model/movieid');
const apiConfig = require('./apiConfig');

router.get('/getTrendingMovie', async (req, res) => {
    const trendind_video_url = `${apiConfig.base_url}trending/movie/week?api_key=${process.env.API_KEY}`
    try {
        const res_data = await axios.get(trendind_video_url); 
        res.status(200).json({ data: res_data.data.results.slice(0, 10) });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/getVideo/:movieId', async (req, res) => {
    const movie_id = req.params.movieId;
    try {
        const fetched_video = await axios.get(`${apiConfig.base_url}movie/${movie_id}/videos?api_key=${process.env.API_KEY}`);
        res.send(fetched_video.data)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/getPopular/', async (req, res) => {
    try {

        const url = `${apiConfig.base_url}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_latest = await axios.get(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_latest.data.results);

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getToprated', async (req, res) => {
    try {

        const url = `${apiConfig.base_url}movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_latest = await axios.get(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_latest.data.results);

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getUpcoming', async (req, res) => {
    try {

        const url = `${apiConfig.base_url}movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_latest = await axios.get(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_latest.data.results);

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getToptvshow', async (req, res) => {
    try {

        const url = `${apiConfig.base_url}tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_latest = await axios.get(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_latest.data.results);

    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/getAllInfo/:id', async (req, res) => {

    let movie_id = req.params.id;
    try {

        const url = `${apiConfig.base_url}movie/${movie_id}?api_key=${process.env.API_KEY}&append_to_response=credits,watch/providers`
        const videos_url = `${apiConfig.base_url}movie/${movie_id}/videos?api_key=${process.env.API_KEY}`

        const fetch_complete_data = await axios.get(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const fetch_vidoes_data = await axios.get(videos_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })


        let merged_data = {
            ...fetch_complete_data.data,
            ...fetch_vidoes_data.data
        }

        res.status(200).send(merged_data)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/getReviews/:id', async (req, res) => {
    let movie_id = req.params.id;
    try {
        const reviews_url = `${apiConfig.base_url}movie/${movie_id}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_reviews_data = await axios.get(reviews_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_reviews_data.data.results)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/getRecommendation/:id', async (req, res) => {
    let movie_id = req.params.id;
    try {
        const reviews_url = `${apiConfig.base_url}movie/${movie_id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`

        const fetch_reviews_data = await axios.get(reviews_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_reviews_data.data.results)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getCompletePopularList/', async (req, res) => {

    try {
        const get_complete_popular_list_url = `${apiConfig.base_url}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${req.headers.page}`
        const fetch_popular_complete_data = await axios.get(get_complete_popular_list_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_popular_complete_data.data.results)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getCompleteTopratedList/', async (req, res) => {

    try {
        const get_complete_toprated_list_url = `${apiConfig.base_url}movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${req.headers.page}`
        const fetch_toprated_complete_data = await axios.get(get_complete_toprated_list_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_toprated_complete_data.data.results)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getCompleteUpcomingList/', async (req, res) => {

    try {
        const get_complete_upcoming_list_url = `${apiConfig.base_url}movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=${req.headers.page}`
        const fetch_upcoming_complete_data = await axios.get(get_complete_upcoming_list_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res.status(200).send(fetch_upcoming_complete_data.data.results)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/search', async (req, res) => {
    try {

        const search_url = `${apiConfig.base_url}search/movie?api_key=${process.env.API_KEY}&query=${req.headers.query}&page=${req.headers.page}&include_adult=false&sort_by=popularity.desc`

        const searched_item = await axios.get(search_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        res.status(200).send(searched_item.data);

    } catch (error) {
        res.status(500).send(error)
    }
})

// 17 api used here

module.exports = router;