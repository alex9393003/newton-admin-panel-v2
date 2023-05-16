import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { Note } from './Note';
//   import { Treatment } from './Treatment';
  
  @Entity()
  export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @Column({ type: 'enum', enum: ['spinal', 'extremity'] })
    category: string;
  
    @Column({ type: 'enum', enum: ['upper-cerv', 'mid-cerv', 'lower-cerv', 'sub-occ', 'upper-t', 'mid-t', 'lower-t', 'upper-l', 'lower-l', 'upper-sac', 'lower-sac'], nullable: true })
    region: string;
  
    @Column({ type: 'enum', enum: ['occ', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9','t10', 't11', 't12', 'l1', 'l2', 'l3', 'l4', 'l5', 's1', 's2', 's3', 's4', 's5'], nullable: true })
    spinalLevel: string;
  
    @Column({ type: 'enum', enum: ['shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'scap', 'ankle', 'foot'], nullable: true })
    extremityLevel: string;
  
    @Column({ type: 'enum', enum: ['l', 'r', 'b'] })
    side: string;
  
    @Column('boolean')
    sublux: boolean;
  
    @Column('boolean')
    muscleSpasm: boolean;
  
    @Column('boolean')
    triggerPoints: boolean;
  
    @Column('boolean')
    tenderness: boolean;
  
    @Column('boolean')
    numbness: boolean;
  
    @Column('boolean')
    edema: boolean;
  
    @Column('boolean')
    swelling: boolean;
  
    @Column('boolean')
    reducedMotion: boolean;
  
    @Column('text')
    physioPositioning: string;
  
    @Column('boolean')
    coldPack: boolean;
  
    @Column('boolean')
    hotPack: boolean;
  
    @Column('boolean')
    electStim: boolean;
  
    @Column('boolean')
    traction: boolean;
  
    @Column('boolean')
    massage: boolean;

    @Column('text')
    treatmentPositioning: string;
  
    @Column('text')
    technique: string;
  
    @Column('boolean')
    manipulation: boolean;
  
    @ManyToOne(() => Note, (note) => note.entries)
    @JoinColumn()
    note: Note;
  
    // @OneToMany(() => Treatment, (treatment) => treatment.entry)
    // treatments: Treatment[];
  }