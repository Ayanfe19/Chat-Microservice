import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userSessions")
export default class UserSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("char", { length: 36 })
    username: string;

    @CreateDateColumn()
    createdAt: string;

    @Column()
    expiressAt: string;
}