/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Sequelize } from 'sequelize';
import User from './users';
import Good from './good';
import Auction from './auction';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// const db = {
//   sequelize,
//   Sequelize,
//   User: User(sequelize, Sequelize),
// };

// type dbProperties = {
//   sequelize: Sequelize;
//   Sequelize: typeof Sequelize;
//   User: (sequelize: Sequelize, Sequelize: Sequelize) => any;
//   Good: (sequelize: Sequelize, Sequelize: Sequelize) => any;
//   Auction: (sequelize: Sequelize, Sequelize: Sequelize) => any;
// };

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Good = Good(sequelize, Sequelize);
db.Auction = Auction(sequelize, Sequelize);

db.Good.belongsTo(db.User, { as: 'owner' });
db.Good.belongsTo(db.User, { as: 'sold' });
db.User.hasMany(db.Auction);
db.Good.hasMany(db.Auction);
db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);

export default db;
