import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PasswordResetToken } from "./password_reset_token.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    favoriteTheme: string;

    @Column()
    avatarUrl: string;

    @OneToMany(() => PasswordResetToken, (passwordResetToken) => passwordResetToken.user)
    passwordResetToken: PasswordResetToken[];

}