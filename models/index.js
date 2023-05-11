const User = require('./User');
const Character = require('./Character');
const Favorite = require('./Favorite');

User.hasMany(Character, {
  foreignKey: 'user_id'
});

Character.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Character, {
  through: Favorite,
  foreignKey: 'user_id',
});

Character.belongsToMany(User, {
  through: Favorite,
  foreignKey: 'character_id',
});

module.exports = { User, Character, Favorite };