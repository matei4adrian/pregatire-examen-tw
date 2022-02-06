// o	GET operation for the first entity - 0.3
// o	POST operation for the first entity - 0.3
// o	PUT operation for the first entity - 0.3
// o	DELETE operation for the first entity - 0.3

const SpacecraftDB = require("../models").Spacecraft;

const controller = {
  getAllSpacecrafts: async (req, res) => {
    SpacecraftDB.findAll()
      .then((spacecrafts) => {
        res.status(200).send(spacecrafts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  addSpacecraft: async (req, res) => {
    if (
      req.body.name.length < 3 ||
      req.body.maximumSpeed < 1000 ||
      req.body.mass < 200
    ) {
      res.status(400).send({ message: "Invalid spacecraft!" });
    } else {
      SpacecraftDB.create(req.body)
        .then((spacecraft) => {
          res.status(200).send(spacecraft);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error" });
        });
    }
  },
  updateSpacecraft: async (req, res) => {
    if (
      req.body.name.length < 3 ||
      req.body.maximumSpeed < 1000 ||
      req.body.mass < 200
    ) {
      res.status(400).send({ message: "Invalid spacecraft" });
    } else {
      SpacecraftDB.findByPk(req.params.spacecraftId)
        .then(async (spacecraft) => {
          if (spacecraft) {
            Object.assign(spacecraft, req.body);
            await spacecraft.save();
            res.status(202).send({ message: "Spacecraft updated!" });
          } else {
            res.status(404).json({ message: "Spacecraft not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  deleteSpacecraft: async (req, res) => {
    SpacecraftDB.findByPk(req.params.spacecraftId)
      .then(async (spacecraft) => {
        if (spacecraft) {
          await spacecraft.destroy();
          res.status(202).send({ message: "Spacecraft deleted!" });
        } else {
          res.status(404).json({ message: "Spacecraft not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
