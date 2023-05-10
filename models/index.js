const User = require('./User');
const Character = require('./character');

User.hasMany(Character, {
  foreignKey: 'user_id'
});

Character.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Character };