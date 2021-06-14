import {
  ObjectID,
  CreateDateColumn,
  Column,
  ObjectIdColumn,
  Entity,
  
} from 'typeorm';

@Entity('deals')
class Deal {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  dealId: number

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

}

export default Deal;