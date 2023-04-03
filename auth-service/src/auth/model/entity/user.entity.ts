import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'address',
    nullable: false,
    unique: true,
  })
  address: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  @Column({
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    name: 'cover_url',
    nullable: true,
  })
  coverUrl: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'verified',
    nullable: false,
    default: false,
  })
  verified: boolean;

  @CreateDateColumn({
    name: 'created_date',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'modified_date',
  })
  modifiedDate: Date;

  constructor(address: string) {
    this.address = address;
    this.role = Role.USER;
  }
}
