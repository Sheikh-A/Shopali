const express = require('express');
const { Client } = require('knex');
const { client } = require('../database/dbConfig.js');
const dbConfig = require('../database/dbConfig.js');
const checkRole = require("../auth/check-role-middleware.js");

const Clients = require("./flex-model.js");

const router = express.Router();

//Get Function
router.get('/', (req, res) => {
    Clients.find()
      .then(clients => {
          res.json(clients);
      })
      .catch(err => {
          res.status(500).json({ message: "Failed to get client" });
      });
});

//Get Function Shipments
router.get('/shipments', (req, res) => {
    Clients.findAllShipments()
      .then(shipment => {
          res.json(shipment);
      })
      .catch(err => {
          res.status(500).json({ message: "Failed to get shipments" });
      });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Clients
      .findById(id)
      .then(client => {
          client ?
          res.status(200).json(client)
            : res //else
              .status(404)
              .json({ message:" THe client with ID does not exist" });
      })
      .catch(error => {
          console.log(error);
          res.status(500).end.json({ message: "The client info could not be retrieved" });
      });
});



router.post("/", (req, res) => {
    const { client_name, client_segment } = req.body;

    if(!client_name || !client_segment) {
        res.status(400).json({ errorMessage: "Please provide client name and segment" });
    } else if ((client_segment != "SMB") && (client_segment != "Mid-Market") && (client_segment != "Emerging") && (client_segment != "Enterprise")) {
        res.status(400).json({ errorMessage: "Please choose SMB, Mid-Market, Enterprise or Emerging for client Segment" });
    } else {
        Clients.add(req.body)
          .then(client => {
            client ?
              res.status(201).json(req.body) :
              res.status(404).json({message: "Client with name exists"})
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Either client_name already exists or there was an error while saving client to DB" });
          });
    }
});

router.put("/:id", (req, res) => {
    const { client_name, client_segment } = req.body;
    const { id } = req.params;
    const changes = req.body;

    if(!client_name || !client_segment) {
        res.status(400).json({ errorMessage: "Please provide client name and segment" });
    } else if ((client_segment != "SMB") && (client_segment != "Mid-Market") && (client_segment != "Emerging") && (client_segment != "Enterprise")) {
        res.status(400).json({ errorMessage: "Please choose SMB, Mid-Market, Enterprise or Emerging for client Segment" });
    } else {
        Clients.update(id, changes)
          .then(client => {
            client ?
              res.status(201).json(changes) :
              res.status(404).json({message: "Client with ID does not exist"});
             //Created successful
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving client to DB" });
          });
    }
});

const admin = "admin";

router.delete("/:id", checkRole(admin), (req, res) => {
    const id = req.params.id;

    Clients
      .findById(id)
      .then(client => {
          client ?
            Clients
              .remove(id)
              .then(deleted => {
                  deleted ?
                  res.status(200).json({message: `Client ${id} deleted`})
                  : res.status(400).json({message: "Client with that id does not exist"})
              })
              : res.status(400).json({message: "Client with that id does not exist"})
      })
      .catch(err => {
          res.status(500).json({message: "Client cannot be deleted"});
      });
})




router.get('/shipments/:id', (req, res) => {
    const { id } = req.params;

    Clients.findClientShipments(id)
    .then(data => {
        data.length >= 0 ?
        res.status(200).json(data)
        : res.status(404).json({message: "Client ID does not exist"})
    })
    .catch(err => {
        res.status(500).json( {
            message: "Shipments cannot be retrieved"
        })
    });

});



router.post("/shipments", (req, res) => {
    const { shipment_name } = req.body;
    const { client_id } = req.body;
    !shipment_name ? // Not shipment name?
        res.status(400).json({ errorMessage: "Please provide shipment title for the shipment." }) // if the request body is missing the shipment property (Bad Request) - worked on postman
    : Clients.findById(client_id) // : else
      .then(client => {
        if (!client) { res.status(404).json({ error: "The client with that client ID does not exist." }) // working on postman
      } else {
        let newShipment = {
            shipment_name: shipment_name, client_id: client_id
        }
        Clients.insertShipment(newShipment) // saves the new shipment to the db
          .then(shipment => {
              res.status(201).json(req.body)
          })
          .catch(err => {
              res.status(404).json({errorMessage: err})
          })
      .catch(err => {
        console.log(error);
        res.status(500).json({ errorMessage: "There was an error while saving the shipment to the database"
          })
        })
      } // POST request is possible to do 500 error on postman
    })
  });
module.exports = router;
