const express = require('express');
const router = express.Router();
const Likes = require('../model/likemodel')
const fetchUser = require('../middleware/fetchuser');

router.post('/doLike/:id', fetchUser, async (req, res) => {
    try {
        const userId = await req.user;

        let like = await Likes.find({ movieId: req.params.id });
        if (like.length > 0) {
            res.status(200).json({ success: true, like });
        } else {
            const payload = {
                movieId: req.params.id,
                userId: userId,
                poster_path: req.body.poster_path,
                vote_average: req.body.vote_average
            }

            like = Likes(payload)
            like.save()
            res.status(200).json({ success: true, like });
        }


    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/unLike/:id', fetchUser, async (req, res) => {
    try {
        let movieId = req.params.id;
        let userId = await req.user;
        const dbres = await Likes.findOneAndDelete({ movieId: movieId, userId: userId });

        res.status(200).json({ success: false, dbres })
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/getlike/:id', fetchUser, async (req, res) => {
    let movieId = req.params.id;
    let userId = await req.user;
    
    const dbres = await Likes.findOne({ movieId: movieId, userId: userId });

    if (dbres) {
        return res.status(200).json({ success: true, id: dbres.id })
    }

    return res.status(200).json({ success: false })
})


router.get('/getfav', fetchUser, async (req, res) => {

    try {
        let userId = await req.user;
        let dbres = await Likes.find({ userId: userId })

        return res.status(200).json({ success: true, dbres })
    } catch (error) {
        res.status(500).send(error)
    }

})


module.exports = router;