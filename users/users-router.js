const router = require("express").Router();
const Users = require("./users-model.js");
const checkRole = require("../auth/check-role-middleware.js");

// router.get("/", (req,res) => {
//     Users.find()
//       .then(users => {
//           res.json(users);
//       })
//       .catch(err => res.send(err));
// });

const admin = "admin";


router.get("/admin", checkRole(admin), (req,res) => {
    Users.find()
      .then(users => {
          res.json({users});
      })
      .catch(err => res.send(err));
});


router.delete("/admin/:id", checkRole(admin), (req, res) => {
    const id = req.params.id;

    Users
      .findById(id)
      .then(user => {
          user ?
            Users
              .remove(id)
              .then(deleted => {
                  deleted ?
                  res.status(200).json({message: `User ${id} deleted`})
                  : res.status(400).json({message: "User with that id does not exist"})
              })
              : res.status(400).json({message: "User with that id does not exist"})
      })
      .catch(err => {
          res.status(500).json({message: "User cannot be deleted"});
        });
})

module.exports = router;
