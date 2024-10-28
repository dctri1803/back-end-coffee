import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PasswordResetToken } from "./password-reset-token.entity";
import { Franchise } from "./franchises.entity";
import { ProductReview } from "./product-reviews.entity";
import { Address } from "./address.entity";
import { Cart } from "./cart.entity";
// import { Cart } from "./cart.entity";
// import { PaymentMethod } from "./payment-method";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    favorite_theme: string;

    @Column()
    avatar_url: string;

    @Column()
    phone_number: string;

    @OneToMany(() => PasswordResetToken, (passwordResetToken) => passwordResetToken.user)
    passwordResetToken: PasswordResetToken[];

    @OneToMany(() => Franchise, (franchise) => franchise.owner)
    franchise: Franchise[];

    @OneToMany(() => ProductReview, (review) => review.user)
    review: ProductReview[];

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];
    // @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
    // paymentMethods: PaymentMethod[];

}