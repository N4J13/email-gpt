// model for google oauth login with sequelize

import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const User = sequelize.define("User", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
