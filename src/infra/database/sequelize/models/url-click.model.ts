import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

// Interfaces para tipagem adequada
export interface UrlClickAttributes {
  id: string;
  shortUrlId: string;
  createdAt: Date;
}

export interface UrlClickCreationAttributes {
  id?: string;
  shortUrlId: string;
}

@Table({
  tableName: 'url_clicks',
  underscored: true,
  timestamps: false, // Só usa createdAt, não updatedAt
})
export class UrlClick extends Model<
  UrlClickAttributes,
  UrlClickCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'short_url_id',
  })
  shortUrlId!: string;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  declare createdAt: Date;
}
