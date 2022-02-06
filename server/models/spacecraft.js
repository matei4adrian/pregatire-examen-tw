// Spacecraft has an id (integer, primary key),
//  a name (string of at least 3 characters),
//   a maximum speed (a number greater than 1000),
//   a mass (a number greater than 200).

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Spacecraft", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 30] },
    },
    maximumSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1000 },
    },
    mass: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 200 },
    },
  });
};
