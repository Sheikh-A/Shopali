const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const countryRouter = require('../countries/countries-router.js');
const usersRouter = require('../users/users-router.js');
const flexRouter = require('../flex/flex-router.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('tiny'));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/countries', authenticate, countryRouter);
server.use('/api/flex', authenticate, flexRouter);
server.use("/api/users", authenticate, usersRouter);

server.get('/', (req, res) => {
    res.status(200).send((`<h1>API: Up Up and Away, welcome Shopify Friends!</h1>`))
})


module.exports = server;
