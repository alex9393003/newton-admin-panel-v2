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
  
    @Column()
    sublux: boolean;
  
    @Column()
    muscleSpasm: boolean;
  
    @Column()
    triggerPoints: boolean;
  
    @Column()
    tenderness: boolean;
  
    @Column()
    numbness: boolean;
  
    @Column()
    edema: boolean;
  
    @Column()
    swelling: boolean;
  
    @Column()
    reducedMotion: boolean;
  
    @Column()
    positioning: string;
  
    @Column()
    coldPack: boolean;
  
    @Column()
    hotPack: boolean;
  
    @Column()
    electStim: boolean;
  
    @Column()
    traction: boolean;
  
    @Column()
    massage: boolean;
  
    @Column()
    technique: string;
  
    @Column()
    manipulation: boolean;
  
    @ManyToOne(() => Note, (note) => note.entries)
    note: Note;
  
    // @OneToMany(() => Treatment, (treatment) => treatment.entry)
    // treatments: Treatment[];
  }