import { BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username'])
export class fte_admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_admin: number

    @Column({ type: 'varchar', length: 50 })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text' })
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update: Date;
}