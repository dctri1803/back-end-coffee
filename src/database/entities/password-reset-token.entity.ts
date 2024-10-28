import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('password_reset_tokens')
export class PasswordResetToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    token: string;

    @Column()
    expired_at: Date;

    @ManyToOne(() => User, (user) => user.passwordResetToken, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}