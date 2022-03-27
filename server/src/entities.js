import { EntitySchema } from 'typeorm';
import { UserModel } from './models.js';

export const BaseColumnSchemaPart = {
  id: {
    type: 'int',
    primary: true,
    generated: true,
  },
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  },
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  },
};

export const UserEntity = new EntitySchema({
  name: 'UserModel',
  target: UserModel,
  columns: {
    ...BaseColumnSchemaPart,
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    btcAddress: {
      type: 'varchar',
      nullable: true,
    },
    btcWalletName: {
      type: 'varchar',
      nullable: true,
    },
  },
  // relations: {
  //   categories: {
  //     target: 'Category',
  //     type: 'many-to-many',
  //     joinTable: true,
  //     cascade: true,
  //   },
  // },
});
