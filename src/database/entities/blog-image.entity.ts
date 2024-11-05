import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogPost } from "./blog-post.entity";


@Entity("blog_images")
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  blog_post_id:number

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.images, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'blog_post_id' })
  blogPost: BlogPost;
}
