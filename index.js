const express = require('express')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const connectToDb = require('./db/db');
const path = require('path');
const PORT = process.env.PORT || 5000;
connectToDb();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/', require('./api/Api'));
app.use('/auth/', require('./auth/Auth'));
app.use('/comment', require('./comments/comment'));
app.use('/likeapi', require('./likes/like'));



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}



app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))