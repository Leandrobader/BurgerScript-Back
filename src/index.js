const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

//settings
require('dotenv').config();
app.set('port', process.env.PORT || 3000);


//midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//routes



//static files
app.use(express.static(path.join(__dirname, '/public')));


//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
});


