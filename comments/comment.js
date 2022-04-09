const express = require('express');
const router = express.Router();
const Comments = require('../model/commentmodel');
const User = require('../model/usermodel')
const fetchuser = require('../middleware/fetchuser');



router.post('/postComments', fetchuser, async (req, res) => {
    try {
        const userid = await req.user;
        const user = await User.findById(userid).select("-password")
        const payload = {
            message: req.body.message,
            user: user,
            movieId: req.body.movieId,
        }

        let comment = await Comments(payload);
        comment.save()

        res.status(200).json({ success: true, comment });

    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/getComments/:id', async (req, res) => {
    try {
        let comments = await Comments.find({movieId: req.params.id});
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router;