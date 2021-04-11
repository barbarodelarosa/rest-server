// ==================================
//    PUERTO
// ==================================
process.env.PORT = process.env.PORT || 3000;


// =================================
// ENTORNO
// =================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/backenddb';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;