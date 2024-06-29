import { Sequelize } from 'sequelize';
import config from '../../../config/config';

const sequelize = new Sequelize(config.databaseUrl);

export default sequelize;
