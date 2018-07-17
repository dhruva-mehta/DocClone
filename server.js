const express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser')
import passport from './backend/passport'
import auth from './backend/auth'
const app = express();

app.use(express.static("public"));
app.use(session({ secret: "tractor" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

app.use('/',auth(passport))

const PORT = process.env.PORT || 3000;
app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
