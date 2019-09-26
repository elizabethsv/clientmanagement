const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

router.post('/register-trainer', (req,res)=>{
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

router.post('/login',(req,res)=>{
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

module.exports = router