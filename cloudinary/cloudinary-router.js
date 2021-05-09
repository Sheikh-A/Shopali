const express = require('express');
const { Client } = require('knex');
const { client } = require('../database/dbConfig.js');
const dbConfig = require('../database/dbConfig.js');
const checkRole = require("../auth/check-role-middleware.js");
const { cloudinary } = require('../cloudinary/cloudinary.js');


const router = express.Router();


router.get('/', async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:dev_setups')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

router.post('/', async (req, res) => {
  try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_setups',
      });
      console.log(uploadResponse);
      res.json({ msg: 'uploaded image' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});


module.exports = router;
