const axios = require('axios');

const router = require('express').Router();
const restricted = require('../auth/authenticate-middleware')

router.get('/', restricted, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://restcountries.eu/rest/v2/all', requestOptions)
    .then(response => {
      console.log(response.data[0].title);
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Countries', error: err });
    });
});

module.exports = router;
