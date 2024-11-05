import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogComment } from "./blog-comments.entity";
import { BlogImage } from "./blog-image.entity";

@Entity("blog_posts")
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @OneToMany(() => BlogComment, comment => comment.blogPost, { cascade: true })
    comments: BlogComment[];

    @OneToMany(() => BlogImage, (image) => image.blogPost, { cascade: true })
    images: BlogImage[];
}