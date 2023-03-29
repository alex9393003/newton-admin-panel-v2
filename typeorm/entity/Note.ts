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
  
    @Column()
    heightFeet: number;
  
    @Column()
    heightInches: number;
  
    @Column()
    temperature: number;
  
    @Column()
    respiration: number;
  
    @Column()
    systolic: number;
  
    @Column()
    diastolic: number;
  
    @Column()
    physiotherapy: number;
  
    @Column()
    roomAssignment: number;
  
    @Column()
    physio: number;
  
    @Column()
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