// Astronaut has an id (integer, primary key), a name (string of at least 5 characters), a role (from a limited set of possible roles e.g. COMMANDER, PILOT).

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Astronaut", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 30] },
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["COMMANDER", "PILOT", "ENGINEER"],
    },
  });
};
