const express = require('express');
const { Client } = require('knex');
const { client } = require('../database/dbConfig.js');
const dbConfig = require('../database/dbConfig.js');
const checkRole = require("../auth/check-role-middleware.js");

const Images = require("./image-model.js");

const router = express.Router();



// remove,
// findAllImages,

//Get Function
router.get('/', (req, res) => {
    Images.find()
      .then(images => {
          res.json(images);
      })
      .catch(err => {
          res.status(500).json({ message: "Failed to get image data" });
      });
});

//Get All Image URLs
router.get('/urls', (req, res) => {
  Images.findAllImages()
    .then(image => {
        res.json(image);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to get image" });
    });
});

// Images findById,
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Images
      .findById(id)
      .then(image => {
          image ?
          res.status(200).json(image)
            : res //else
              .status(404)
              .json({ message:" The image with ID does not exist" });
      })
      .catch(error => {
          console.log(error);
          res.status(500).end.json({ message: "The image info could not be retrieved" });
      });
});



// add,
router.post("/", (req, res) => {
    const { image_url, description, price } = req.body;

    if(!(image_url || description || price)) {
        res.status(400).json({ errorMessage: "Please provide image_url, description, and price" });
    }
    else {
        Images.add(req.body)
          .then(image => {
            image ?
              res.status(201).json(req.body) :
              res.status(404).json({message: "image with name exists"})
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Either image_url already exists or there was an error while saving image to DB" });
          });
    }
});


// update,
router.put("/:id", (req, res) => {
    const { image_url, description, price } = req.body;
    const { id } = req.params;
    const changes = req.body;

    if(!description || !price) {
        res.status(400).json({ errorMessage: "Please provide updated description and price" });
    }
    else {
        Images.update(id, changes)
          .then(image => {
            image ?
              res.status(201).json(changes) :
              res.status(404).json({message: "image with ID does not exist"});
             //Created successful
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving image to DB" });
          });
    }
});

const admin = "admin";

//router.delete("/:id", checkRole(admin), (req, res) => {

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Images
      .findById(id)
      .then(image => {
          image ?
            Images
              .remove(id)
              .then(deleted => {
                  deleted ?
                  res.status(200).json({message: `Image ${id} deleted`})
                  : res.status(400).json({message: "Image with that id does not exist"})
              })
              : res.status(400).json({message: "Image with that id does not exist"})
      })
      .catch(err => {
          res.status(500).json({message: "Image cannot be deleted"});
      });
})



module.exports = router;
