const mongoose = require('mongoose');
require('dotenv').config();

function connectDatabase() {
    mongoose.connect(process.env.DBCONNECT, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error))
    db.once("open", () => console.log('Banco conectado'))
    }
      
module.exports = connectDatabase;