import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 30 })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: string;

  @Column()
  isDelete: boolean;
}
