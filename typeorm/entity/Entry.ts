import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Note } from './Note';
//   import { Treatment } from './Treatment';
  
  @Entity()
  export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @Column({ type: 'enum', enum: ['spinal', 'extremeties'] })
    category: string;
  
    @Column({ type: 'enum', enum: ['upper-cerv', 'mid-cerv', 'lower-cerv', 'sub-occ', 'upper-t', 'mid-t', 'lower-t'] })
    region: string;
  
    @Column({ type: 'enum', enum: ['t1', 't2', 't3'], nullable: true })
    spinalLevel: string;
  
    @Column({ type: 'enum', enum: ['arm', 'bicep', 'tricep'], nullable: true })
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
    positioning: string;
  
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
    technique: string;
  
    @Column('boolean')
    manipulation: boolean;
  
    @ManyToOne(() => Note, (note) => note.entries)
    note: Note;
  
    // @OneToMany(() => Treatment, (treatment) => treatment.entry)
    // treatments: Treatment[];
  }