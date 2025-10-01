const sequelize = require('../config/db');
const UserModel = require('./user');
const ProfileModel = require('./profile');
const PostModel = require('./post');
const RoleModel = require('./role');

const User = UserModel(sequelize);
const Profile = ProfileModel(sequelize);
const Post = PostModel(sequelize);
const Role = RoleModel(sequelize);

// Associations

// One-to-One: User <-> Profile
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// One-to-Many: User -> Post
User.hasMany(Post, { foreignKey: 'userId', as: 'posts', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Many-to-Many: User <-> Role via UserRoles
User.belongsToMany(Role, { through: 'UserRoles', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', as: 'users' });

module.exports = {
  sequelize,
  User,
  Profile,
  Post,
  Role
};
