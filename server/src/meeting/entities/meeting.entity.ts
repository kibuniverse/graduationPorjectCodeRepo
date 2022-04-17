import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  title: string;

  @Column()
  createUserId: number;

  @Column('varchar', { length: 8 })
  roomId: string;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  createDate: string;

  @UpdateDateColumn({ type: 'timestamp', comment: '修改时间' })
  updateDate: string;

  @Column('varchar', { length: 10 })
  beginTime: string;

  @Column('varchar', { length: 10 })
  endTime: string;

  @Column()
  maxCapacity: number;

  @Column()
  isDelete: boolean;
}
