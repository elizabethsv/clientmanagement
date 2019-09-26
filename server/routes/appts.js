const express = require('express')
const router = express.Router()
const Op = require('./models').Sequelize.Op;


router.get('/',(req,res)=>{
    models.PtSession.findAll({
        where:{status:'active'},
        attributes:['id','title', 'start', 'end', 'allDay']
    }).then(appt=>res.json(appt))
    
})

router.get('/cancelled',(req,res)=>{
    models.PtSession.findAll({
        where:{status:'cancelled'},
        attributes:['id','title', 'start', 'end', 'allDay']
    }).then(appt=>res.json(appt))
    
})

router.post('/add',(req,res)=>{
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

// app.post('/addsession',(req,res)=>{
//     let title= req.body.title
//     let start= req.body.start
//     let end = req.body.end
//     let PtSession = models.PtSession.create({
//         title: title,
//         start: start,
//         end: end,
//         allDay: false,
//         status:'active'
//     })
    
//     res.json({PtSession})
    
// })

router.get('/upcoming', (req,res)=>{
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

router.put('/:apptid',(req,res)=>{
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


router.put('/cancelappt/:apptid', (req,res)=>{
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

module.exports = router