import { Sequelize } from 'sequelize';
// @ts-ignore
import * as config from './config/config';

const sequelize = new Sequelize(config);

sequelize.addHook('beforeFind', (options: any) => {
	options.raw = options.raw ?? true;
	options.nest = options.nest ?? true;
});

export default sequelize;
