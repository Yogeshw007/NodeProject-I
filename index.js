const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// MongoDB
const db = require('./config/mongoose');

//cookie parser
const cookieParser = require('cookie-parser');

// Middlware - to read the req query, body & params
app.use(express.urlencoded());

// Set the cookie parser
app.use(cookieParser());

//Set the static file path - When using the assets directly give the sub folders like css/layout.css
app.use(express.static('./assets'));

// Use the layouts before the routes
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});