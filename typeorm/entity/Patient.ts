import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Note } from './Note';
  import { IsEmail } from 'class-validator';
  
  @Entity()
  export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    firstName: string;
  
    @Column('text')
    lastName: string;
  
    @UpdateDateColumn({ type: 'timestamp' })
    lastUpdated: Date;
  
    @Column('text')
    @IsEmail()
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