import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Note } from './Note';
  
  @Entity()
  export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  
    @Column()
    email: string;
  
    @Column()
    phoneNumber: string;
  
    @Column({ type: 'timestamp' })
    nextAppointment: Date;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @OneToMany(() => Note, (note) => note.patient)
    notes: Note[];
  }