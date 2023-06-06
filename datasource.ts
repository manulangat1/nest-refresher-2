import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'nest_ecom',
  username: 'manulangat',
  password: '3050manu',
  entities: ['dist/**/*.entity.js'],

  //   autoLoadEntities: true,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
