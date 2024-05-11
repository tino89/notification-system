const express = require('express')
const app = express()
var cors = require('cors')




app.use(express.json());
app.use(cors())

const notificationRoutes = require('./controller/notification');
app.use('/', notificationRoutes);


/* Handling errors */
app.use((err, req, res, next) => {
    res.status(500).json({
        error: "Internal Server Error",
    });
});


module.exports= app;
