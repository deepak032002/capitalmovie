const mongoose = require('mongoose');
const Url = process.env.DB || null

const connectToDb = () => {
    try {
        mongoose.connect(Url, () => {
            console.log('Connection is successfully to Db!');
        })
    } catch (error) {
        console.log("error" + error);
    }


}

module.exports = connectToDb;