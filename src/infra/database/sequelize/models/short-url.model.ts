import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { User } from './user.model';

// Interfaces para tipagem adequada
export interface ShortUrlAttributes {
  id: string;
  originalUrl: string;
  shortCode: string;
  userId?: string | null;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ShortUrlCreationAttributes {
  id?: string;
  originalUrl: string;
  shortCode: string;
  userId?: string | null;
  clicks?: number;
}

@Table({
  tableName: 'short_urls',
  underscored: true,
  timestamps: true,
  paranoid: true, // Para soft delete (deletedAt)
})
export class ShortUrl extends Model<
  ShortUrlAttributes,
  ShortUrlCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'original_url',
  })
  originalUrl!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'short_code',
  })
  shortCode!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'user_id',
  })
  userId!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  clicks!: number;

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

  @BelongsTo(() => User)
  user!: User | null;
}
