import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { Note } from './Note';
  import { IsEmail } from 'class-validator';
  import { fileURLToPath } from 'url';
  import path from 'path';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log('dirname for Patient entity file ', __dirname);
  
  @Entity()
  export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text', { nullable: false })
    firstName: string;
  
    @Column('text', { nullable: false })
    lastName: string;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    lastUpdated: Date;
  
    @Column('text', { default: 'john@gmail.com', nullable: false })
    @IsEmail()
    email: string;
  
    @Column('text', { nullable: true })
    phoneNumber: string;
  
    @Column({ type: 'timestamp', nullable: true })
    nextAppointment: Date;
  
    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdDate: Date;
  
    @OneToMany(() => Note, (note) => note.patient)
    notes: Note[];
  }