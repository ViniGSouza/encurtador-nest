import { Module, DynamicModule } from '@nestjs/common';
import { SequelizeDatabaseModule } from './sequelize-database.module';
import { PrismaDatabaseModule } from './prisma-database.module';

@Module({})
export class DatabaseModule {
  /**
   * Método estático para importação dinâmica baseada na variável de ambiente ORM_PROVIDER
   * Usa process.env diretamente para determinar qual ORM usar
   */
  static create(): DynamicModule {
    const ormProvider = process.env.ORM_PROVIDER;

    if (ormProvider === 'sequelize') {
      return {
        module: DatabaseModule,
        imports: [SequelizeDatabaseModule],
        exports: [SequelizeDatabaseModule],
      };
    }

    return {
      module: DatabaseModule,
      imports: [PrismaDatabaseModule],
      exports: [PrismaDatabaseModule],
    };
  }
}
