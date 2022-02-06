// o	GET operation for the second entity as a child resource - 0.3 v
// o	POST operation for the second entity as a child resource - 0.3 v
// o	PUT operation for the second entity as a child resource - 0.3 v
// o	DELETE operation for the second entity as a child resource - 0.3

const AstronautDB = require("./../models").Astronaut;
const SpacecraftDB = require("./../models").Spacecraft;

const controller = {
  getAllAstronautsOfSpacecraft: async (req, res) => {
    SpacecraftDB.findByPk(req.params.spacecraftId, { include: [AstronautDB] })
      .then((spacecraft) => {
        if (spacecraft) {
          res.status(200).send(spacecraft.Astronauts);
        } else {
          res.status(404).send({ message: "Spacecraft not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
  addAstronautOnSpacecraft: async (req, res) => {
    if (
      req.body.name.length < 5 ||
      (req.body.role != "COMMANDER" &&
        req.body.role != "PILOT" &&
        req.body.role != "ENGINEER")
    ) {
      res.status(400).send({ message: "Invalid astronaut!" });
    } else {
      SpacecraftDB.findByPk(req.params.spacecraftId)
        .then((spacecraft) => {
          if (spacecraft) {
            spacecraft
              .createAstronaut(req.body)
              .then((astronaut) => {
                res.status(201).send(astronaut);
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "Spacecraft not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  updateAstronautOfSpacecraft: async (req, res) => {
    if (
      (req.body.name && req.body.name.length < 5) ||
      (req.body.role != "COMMANDER" &&
        req.body.role != "PILOT" &&
        req.body.role != "ENGINEER")
    ) {
      res.status(400).send({ message: "Invalid astronaut!" });
    } else {
      SpacecraftDB.findByPk(req.params.spacecraftId)
        .then((spacecraft) => {
          if (spacecraft) {
            spacecraft
              .getAstronauts({ where: { id: req.params.astronautId } })
              .then(async (astronauts) => {
                const astronaut = astronauts.shift();
                if (astronaut) {
                  Object.assign(astronaut, req.body);
                  await astronaut.save();
                  res.status(202).send({ message: "Astronaut updated!" });
                } else {
                  res.status(404).send({ message: "Astronaut not found!" });
                }
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "Spacecraft not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  deleteAstronautOfSpacecraft: async (req, res) => {
    SpacecraftDB.findByPk(req.params.spacecraftId)
      .then((spacecraft) => {
        if (spacecraft) {
          spacecraft
            .getAstronauts({ where: { id: req.params.astronautId } })
            .then(async (astronauts) => {
              const astronaut = astronauts.shift();
              if (astronaut) {
                await astronaut.destroy();
                res.status(202).send({ message: "Astronaut deleted!" });
              } else {
                res.status(404).send({ message: "Astronaut not found!" });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({ message: "Server error!" });
            });
        } else {
          res.status(404).send({ message: "Spacecraft not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
