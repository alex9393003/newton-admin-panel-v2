import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
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
  
    @Column('integer')
    heightFeet: number;
  
    @Column('integer')
    heightInches: number;
  
    @Column('integer')
    temperature: number;
  
    @Column('integer')
    respiration: number;
  
    @Column('integer')
    systolic: number;
  
    @Column('integer')
    diastolic: number;
  
    @Column('integer')
    physiotherapy: number;
  
    @Column('integer')
    roomAssignment: number;
  
    @Column('integer')
    physio: number;
  
    @Column('integer')
    tx: number;
  
    @Column({ type: 'text' })
    otherNotes: string;
  
    @ManyToOne(() => Patient, (patient) => patient.notes)
    @JoinColumn()
    patient: Patient;
  
    @OneToMany(() => Entry, (entry) => entry.note)
    entries: Entry[];
  
    // @OneToMany(() => Treatment, (treatment) => treatment.note)
    // treatments: Treatment[];
  }