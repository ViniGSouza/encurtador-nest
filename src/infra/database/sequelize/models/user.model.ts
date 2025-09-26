import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { ShortUrl } from './short-url.model';

// Interfaces para tipagem adequada
export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface UserCreationAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true, // Para soft delete (deletedAt)
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  declare updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    field: 'deleted_at',
  })
  declare deletedAt: Date | null;

  @HasMany(() => ShortUrl)
  shortUrls!: ShortUrl[];
}
