const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const databaseConnection = require('./database');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/productRoutes');

const app = express();

//settings
require('dotenv').config();
app.set('port', process.env.PORT || 3000);
databaseConnection();

//midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static files
app.use(express.static(path.join(__dirname, '/public')));


//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
});


//routes
UserRoutes('/users', app);
ProductRoutes('/products', app);