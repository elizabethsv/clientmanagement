const express = require('express')
const app = express();
// require('dotenv').config()
const PORT = 5000
global.models = require('./models')
const cors = require('cors')

// const account= require('./routes/users')


const appts = require('./routes/tickets')
const clients = require('./routes/clients')
const users = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use('/appts', appts)
app.use('/clients', clients)
app.use('/', users)

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


app.listen(PORT, ()=>{
    console.log("server is running")
    
})