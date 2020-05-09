import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_thirteen } from "./document-type-thirteen.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_thirteen extends BaseEntity {

    @PrimaryGeneratedColumn()
    idsig: number;

    @OneToOne(type => fte_document_type_thirteen, thirteen => thirteen.signature, { eager: false })
    type: fte_document_type_thirteen;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'studentt_id' })
    studentt_id: fte_authority;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    studentt_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    studentt_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 1 })
    studentt_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    studentt_time: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}