import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { BlogPost } from "./blog-post.entity";

@Entity("blog_comments")
export class BlogComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    comment: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.commentsBlog, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => BlogPost, blogPost => blogPost.comments, { onDelete: "CASCADE" })
    blogPost: BlogPost;
}