import { Sequelize } from 'sequelize';
// @ts-ignore
import * as config from './config/config';

export default new Sequelize(config);
