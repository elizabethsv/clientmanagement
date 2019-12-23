const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = 5000;
global.models = require('./models');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verify = require('./routes/checkToken');

dotenv.config();
// const account= require('./routes/users')

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const appts = require('./routes/appts');
const clients = require('./routes/clients');
const users = require('./routes/user');
app.use(cors());
app.use(express.json());

app.use('/appts', appts);
app.use('/clients', verify, clients);
app.use('/', users);

app.listen(PORT, () => {
  console.log('server is running');
});
