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
    let role=models.Role.create({
        description: 'trainer'
    })
   res.json([{user},{role}])
})

app.listen(PORT, ()=>{
    console.log("server is running")
})