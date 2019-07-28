const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const Promise = require('bluebird')

require('./server/config/passport')

mongoose.Promise = Promise

require('dotenv').config()
const isProduction = process.env.NODE_ENV === 'production';

const app = express()
app.use(cors())

//express config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, '/public')))

//mongoose config
if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI)
}
else {
    mongoose.connect('mongodb://127.0.0.1:27017/rentify',
    ()=> console.log('connected succesfully'))
    mongoose.set('debug', true)
}

//forward 404 to error handler
app.use((req, res, next)=> {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

//development error handler
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res, next)=> {
      console.log(err.stack)
  
      res.status(err.status || 500)

      res.json({'errors': {
        message: err.message,
        error: err
      }})
    })
  }
  
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=>{
res.status(err.status || 500);
res.json({'errors': {
    message: err.message,
    error: {}
}});
});

// finally, let's start our server...
const server = app.listen( process.env.PORT || 3000, ()=> {
    console.log('Listening on port ' + server.address().port);
});
