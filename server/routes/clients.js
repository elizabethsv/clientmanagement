const express = require('express');
const router = express.Router();
const verify = require('./checkToken');

router.get('/', (req, res) => {
  models.Clients.findAll({
    where: {
      trainerid: req.user.id
    }
  })
    .then(client => {
      res.json(client);
    })
    .catch(err => console.log(err));
});

router.post('/add', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phoneNumber;
  let dob = req.body.dob;

  let user = models.Clients.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: null,
    phone: phone,
    DOB: dob,
    trainerid: req.user.id
  });
  res.json({ user });
});

router.get('/info/:clientid', (req, res) => {
  let clientid = req.params.clientid;

  models.Clients.findAll({
    where: {
      id: clientid
    }
  }).then(client => {
    res.json(client);
  });
});

module.exports = router;
