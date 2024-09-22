const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/routes')
const mongoDb = require('./data/database')

app.use('/', router)



mongoDb.initDb((err)=> {

    if(err) {
        console.log(err)
    }

    else{
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)} )
    }
})