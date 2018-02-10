const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database.config');
const authentication = require("./routes/authentication")(router);
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Connected to the ${config.db} database`)
    }
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client/dist`));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/dist/index.html`));
});

app.listen(1337, () => {
    console.log(`Live on port 1337`);
});

