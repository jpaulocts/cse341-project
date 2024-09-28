const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/routes')
const mongoDb = require('./data/database')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')


app.use(bodyParser.json())

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
} );

app.use('/', router)


mongoDb.initDb((err)=> {

    if(err) {
        console.log(err)
    }

    else{
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)} )
    }
})