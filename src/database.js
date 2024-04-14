const mongoose = require('mongoose');

const databaseConnection = ()=>{
    const URI = process.env.DDBB;

    mongoose.connect(URI);

    connection = mongoose.connection;

    connection.once('open', ()=>{
        console.log('DDBB connect successful');
    });
};

module.exports = databaseConnection;