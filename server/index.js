const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require(`./controllers/controller.js`);
const cors = require('cors')
require('dotenv').config();
const massive = require('massive');
const baseURL = `/api`;
const morgan = require('morgan');

//Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../build'));
app.use(morgan('dev'));

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(db => {
    console.log('Connected to Heroku')
    app.set('db', db)
}).catch(err=>console.log(err))

//Endpoints
app.post(`${baseURL}/getTechniques`, ctrl.getTechniques)
app.post(`${baseURL}/getStudents`, ctrl.getStudents)
app.post(`${baseURL}/updateTechniques`, ctrl.updateTechniques)
app.post(`${baseURL}/updateInstructor`, ctrl.updateInstructor)


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));