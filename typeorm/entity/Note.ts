import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Patient } from './Patient';
  import { Entry } from './Entry';
//   import { Treatment } from './Treatment';
  
  @Entity()
  export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'date' })
    visitDate: Date;
  
    @Column({ type: 'timestamp' })
    visitTime: Date;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    lastEdited: Date;
  
    @Column('number')
    heightFeet: number;
  
    @Column('number')
    heightInches: number;
  
    @Column('number')
    temperature: number;
  
    @Column('number')
    respiration: number;
  
    @Column('number')
    systolic: number;
  
    @Column('number')
    diastolic: number;
  
    @Column('number')
    physiotherapy: number;
  
    @Column('number')
    roomAssignment: number;
  
    @Column('number')
    physio: number;
  
    @Column('number')
    tx: number;
  
    @Column({ type: 'text' })
    otherNotes: string;
  
    @ManyToOne(() => Patient, (patient) => patient.notes)
    patient: Patient;
  
    @OneToMany(() => Entry, (entry) => entry.note)
    entries: Entry[];
  
    // @OneToMany(() => Treatment, (treatment) => treatment.note)
    // treatments: Treatment[];
  }