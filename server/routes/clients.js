const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    models.User.findAll({
        where: {
            roleid: 2
        }
    }).then(client=>{
        res.json(client)
    })
})

router.post('/addclient',(req,res)=>{
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

router.get('/info/:clientid', (req,res)=>{
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

module.exports = router