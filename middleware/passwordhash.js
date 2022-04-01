const bcrypt = require('bcrypt');

const passwordHash = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const genPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = genPass;
    next();
}

module.exports = passwordHash;