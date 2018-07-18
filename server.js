const express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser')
import passport from './backend/passport'
import auth from './backend/auth'
const app = express();

app.use(session({ secret: "tractor" })); //secret string is used to hash the cookie
app.use(bodyParser.urlencoded({ extended: false })); //doesn't matter if the body is json or not
app.use(bodyParser.json()) // turning post requests into json objects
app.use(passport.initialize());
app.use(passport.session());

app.use('/',auth(passport)) //used at every single route 

const PORT = process.env.PORT || 3000;
app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
