const express = require('express')
const app = express();
// require('dotenv').config()
const PORT = 5000
const models = require('./models')
const cors = require('cors')
const jwt = require('jsonwebtoken')
// const account= require('./routes/users')
const bcrypt = require('bcrypt')
const saltRounds = 10
const Op = require('./models').Sequelize.Op;




app.use(cors())
app.use(express.json())

const authenticate = (req,res,next)=>{
    let headers = req.headers['authorization']
    if(headers){
        const token = headers.split(' ')[1]
        let decoded = jwt.verify(token, 'privatekey')
        if(decoded){
            const email = decoded.email
            models.User.findOne({
                where:{
                    email:email
                }
            }).then(user=>{
                if(user){
                    next()
                }else{
                    res.json({message:'error'})
                }
            })
        }else{
            res.json({error: 'unauthorized access'})
        }
    }else{
        res.json({error: 'unauthorized access'})
    }
}

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

app.post('/login',(req,res)=>{
    let email = req.body.email
    let password = req.body.password 

    models.User.findOne({
        where:{email:email},
        attributes: ['id', 'email','password']
    }).then(user=>{
        if(user){
            bcrypt.compare(password, user.get('password'))
            .then(response=>{
                if(response){
                    let token = jwt.sign({email:user.get('email')}, 'privatekey')
                    res.json({token:token})
                }else{
                    console.log('error')
                }
            })
        }else{
            console.log('error')
        }
    })
})


app.get('/appts',(req,res)=>{
    models.PtSession.findAll({
        where:{status:'active'},
        attributes:['id','title', 'start', 'end', 'allDay']
    }).then(appt=>res.json(appt))
    
})
app.get('/cancelledappts',(req,res)=>{
    models.PtSession.findAll({
        where:{status:'cancelled'},
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
                clientid: clientid,
                status: 'active'
            })
            res.json({appt})
    })

})


app.get('/upcomingappts', (req,res)=>{
    let todaysDate = new Date()
    var newDateObj = new Date(todaysDate.getTime() + 180*60000)
   
    models.PtSession.findAll({
        where:{
            start: { 
                [Op.between]: [todaysDate, newDateObj]
              }
        },
        attributes:['id','title', 'start', 'end', 'allDay','clientid']
    }).then(appt=>res.json(appt))
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


app.post('/clients/addclient',(req,res)=>{
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let email = req.body.email
    let phone = req.body.phone

    let user = models.User.create({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: null,
        phone: phone,
        roleid: 2
    })
    res.json({user})
})

app.get('/clientinfo/:clientid', (req,res)=>{
    let clientid = req.params.clientid

    models.User.findAll({
        where: {
            id: clientid,
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

app.put('/cancelappt/:apptid', (req,res)=>{
    let apptid = req.params.apptid
    let status = req.body.status

    let values = {status:status}

    let selector ={
        where:{id:apptid}
    }
    
    models.PtSession.update(values, selector)
        .then(updatedAppt => {
            res.json(updatedAppt)
        })
})

app.post('/addsession',(req,res)=>{
    let title= req.body.title
    let start= req.body.start
    let end = req.body.end
    let PtSession = models.PtSession.create({
        title: title,
        start: start,
        end: end,
        allDay: false,
        status:'active'
    })
    
    res.json({PtSession})
    
})

app.listen(PORT, ()=>{
    console.log("server is running")
    
})