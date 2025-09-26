import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { EnvService } from '@/infra/env/env.service';
import { User } from './models/user.model';
import { ShortUrl } from './models/short-url.model';
import { UrlClick } from './models/url-click.model';

@Injectable()
export class SequelizeService implements OnModuleInit, OnModuleDestroy {
  public readonly sequelize: Sequelize;

  constructor(private envService: EnvService) {
    this.sequelize = new Sequelize(this.envService.get('DATABASE_URL'), {
      dialect: 'postgres',
      models: [User, ShortUrl, UrlClick],
      logging: false, // Equivalente ao log: ['warn', 'error'] do Prisma
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.sequelize.close();
  }

  // Método para sincronizar apenas em desenvolvimento (equivalente ao Prisma migrate)
  async sync() {
    await this.sequelize.sync();
  }
}
