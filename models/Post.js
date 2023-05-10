const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, Infinity],
        msg: 'Password must be at least 5 characters long.',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUnique: async (value, { model }) => {
        const user = await model.findOne({ where: { name: value } });
        if (user) {
          throw new Error('Name is already in use.');
        }
      },
    },
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Character, { foreignKey: 'characterId' });
Character.hasMany(User, { foreignKey: 'characterId' });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((err) => {
    console.error('Error synchronizing models with the database:', err);
  });

module.exports = {
  User,
  Character,
};