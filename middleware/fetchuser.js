const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {

    const token = req.header('authtoken')

    if (!token) {
        res.status(401).json({ err: "Token is Wrong/Not found!" })
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.userId;
    next();
}

module.exports = fetchUser