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
  
    @Column('text')
    firstName: string;
  
    @Column('text')
    lastName: string;
  
    @UpdateDateColumn('date')
    lastUpdated: Date;
  
    @Column('text')
    email: string;
  
    @Column('text')
    phoneNumber: string;
  
    @Column({ type: 'timestamp' })
    nextAppointment: Date;
  
    @CreateDateColumn('date')
    createdDate: Date;
  
    @OneToMany(() => Note, (note) => note.patient)
    notes: Note[];
  }