const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const imageRouter = require('../images_model/image-router.js');
const cloudinaryRouter = require('../cloudinary/cloudinary-router.js');



const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('tiny'));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(express.static('public'));

server.use('/api/auth', authRouter);
server.use('/api/images', authenticate, imageRouter)
server.use("/api/users", authenticate, usersRouter);
server.use("/api/cloudinary", cloudinaryRouter);

server.get('/', (req, res) => {
    res.status(200).send((`<h1>API: Up Up and Away, welcome Shopify Friends!</h1>`))
});

server.get("/test", (req, res) => {
    res.status(200)
    res.send(
      "<h1>Server Status</h1><h2>Server running succesfully.</h2><p>Deployment is all good, continue working.. nothing to see here.</p>"
    );
  });


module.exports = server;
