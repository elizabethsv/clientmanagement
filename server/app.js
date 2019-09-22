const express = require('express')
const app = express();
// require('dotenv').config()
const PORT = 5000
const models = require('./models')
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const account= require('./routes/users')
// const bcrypt = require('bcrypt')
// const saltRounds = 10




app.use(cors())
app.use(express.json())

app.post('/register-trainer', (req,res)=>{
    let firstname= req.body.firstname
    let lastname=req.body.lastname
    let email = req.body.email
    let password = req.body.password
    let user = models.User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
   
   res.json({user})
})

app.get('/appts',(req,res)=>{
    models.PtSession.findAll({
        attributes:['id','title', 'start', 'end', 'allDay']
    }).then(appt=>res.json(appt))
    
})

app.put('/appts/:apptid',(req,res)=>{
    let apptid = req.params.apptid
    let start = req.body.start
    let end = req.body.end
    var values = { start: start, end: end};
    var selector = { 
    where: { id:apptid }
    };
    models.PtSession.update(values, selector)
    .then(updatedObj=> {
        res.json(updatedObj)
    });

})

app.post('/addsession',(req,res)=>{
    let title= req.body.title
    let start= '2019-11-12 08:30'
    let end = '2019-11-12 09:00'
    let allDay = false
    let PtSession = models.PtSession.create({
        title: title,
        start: start,
        end: end,
        allDay: allDay,
    })
    
    res.json({PtSession})
    
})

app.listen(PORT, ()=>{
    console.log("server is running")
})