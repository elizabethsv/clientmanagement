const express = require('express')
const app = express();
// require('dotenv').config()
const PORT = 5000
const models = require('./models')
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const account= require('./routes/users')
const bcrypt = require('bcrypt')
const saltRounds = 10




app.use(cors())
app.use(express.json())

app.post('/register-trainer', (req,res)=>{
    let firstname= req.body.firstname
    let lastname=req.body.lastname
    let email = req.body.email
    let password = req.body.password

    models.User.findOne({
        where: {email:email}
    }).then(user=>{
        if(user){
            res.send('username taken')
        }else{
            bcrypt.hash(password,saltRounds).then((hash)=>{
                models.User.create({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hash,
                    roleid:1
                    })
                }).then(user=>res.json(user))
                .catch(e=>console.log(e))
            }
        })
})



app.get('/appts',(req,res)=>{
    models.PtSession.findAll({
        attributes:['id','title', 'start', 'end', 'allDay']
    }).then(appt=>res.json(appt))
    
})


app.post('/addsession',(req,res)=>{
    let clientid = req.body.clientid
    let start = req.body.start
    let end = req.body.end
    
    models.User.findOne({
        where: {
            id:clientid
        },
        attributes: ['id','firstname']
    }).then(user=>{
       let appt= models.PtSession.create({
                title: user.firstname,
                start: start,
                end: end,
                allDay: false, 
                clientid: clientid
            })
            res.json({appt})
    })

    
    


    
})
//PULL FROM USER DB WHERE ROLE = 'CLIENT'
app.get('/clients', (req, res)=>{
    models.User.findAll({
        where: {
            roleid: 2
        }
    }).then(client=>{
        res.json(client)
    })
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
    let start= req.body.start
    let end = req.body.end
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