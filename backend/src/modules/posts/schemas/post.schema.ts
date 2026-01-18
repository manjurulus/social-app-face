// src/modules/posts/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: false, default: null })
  imageUrl?: string;

  @Prop({ required: true })
  userId: string;

  // Likes
  @Prop({ type: [String], default: [] })
  likes: string[];

  // Comments
  @Prop({
    type: [
      {
        userId: String,
        text: String,
        createdAt: Date,
      },
    ],
    default: [],
  })
  comments: { userId: string; text: string; createdAt: Date }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
