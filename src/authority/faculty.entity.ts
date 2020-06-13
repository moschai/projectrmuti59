import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { fte_authority } from "./authority.entity";
import { fte_major } from "./major.entity";

@Entity()
export class fte_faculty extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_faculty: number

    @OneToMany(type => fte_authority, authority => authority.faculty, { eager: false })
    authority: fte_authority[];

    @OneToMany(type => fte_major, major => major.faculty, { eager: false })
    major: fte_major[];

    @Column({type:'varchar',length:255})
    name_faculty:string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update: Date;

 
}