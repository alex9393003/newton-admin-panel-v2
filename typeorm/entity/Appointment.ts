import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    appt: string


}
