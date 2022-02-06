const Sequelize = require("sequelize");
const db = require("../config/db");
const AstronautModel = require("./astronaut");
const SpacecraftModel = require("./spacecraft");

const Astronaut = AstronautModel(db, Sequelize);
const Spacecraft = SpacecraftModel(db, Sequelize);

Spacecraft.hasMany(Astronaut);
Astronaut.belongsTo(Spacecraft);

module.exports = {
  Astronaut,
  Spacecraft,
  connection: db,
};
