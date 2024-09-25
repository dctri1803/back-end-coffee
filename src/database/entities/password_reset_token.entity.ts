import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('password_reset_tokens')
export class PasswordResetToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    token: string;

    @Column()
    expiredAt: Date;

    @ManyToOne(() => User, (user) => user.passwordResetToken, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}