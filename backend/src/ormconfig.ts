import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './configs/configuration';

dotenv.config();
// завантажує змінні середовища з файлу .env,
// розташованого в кореневій текі проекту

const config = configuration().database;
//  отримуємо конфігурації (налаштуання для підключення до БД) з configuration.ts

export default new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.name,
  entities: [
    path.join(
      __dirname,
      '..',
      'infrastructure',
      'mysql',
      'entities',
      '*.entity.ts',
    ),
  ],
  // Ентіті - описує структуру таблиці в БД, це типу як моделі
  migrations: [
    path.join(__dirname, '..', 'infrastructure', 'mysql', 'migrations', '*.ts'),
  ],
  // Шлях до файлів міграцій
  synchronize: false,
});
