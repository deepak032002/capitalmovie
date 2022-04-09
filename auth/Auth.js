const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordHash = require('../middleware/passwordhash');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/createUser', [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], passwordHash, async (req, res) => {
    try {

        const obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(202).json({ msg: "Invalid Values!", signal: false });
        }

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(200).json({ msg: "User already exist with this Email!", signal: false })
        }

        user = await User(obj);
        user.save();
        // console.log(user);
        res.status(200).json({ msg: "Sign Up Successfully!", signal: true });
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(202).json({ msg: "Invalid Values", signal: false });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(202).json({ authtoken: null, msg: 'Please login with correct credentials ', signal: false })
        }

        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(202).json({ authtoken: null, msg: 'Please login with correct credentials ', signal: false })
        }


        const data = {
            userId: user._id
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.status(200).json({ authtoken, msg: "Login Succesfully!", signal: true });

    } catch (error) {
        console.log(error);
    }
})

router.get('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = await req.user;
        const user = await User.findById(userId).select("-password")
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router;