const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//Set the static file path - When using the assets directly give the sub folders like css/layout.css
app.use(express.static('./assets'));

// Use the layouts before the routes
app.use(expressLayouts);

//Set css & js to add in the head
app.set('layout extractStyles', true);
app.set('layout extractScript', true);

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