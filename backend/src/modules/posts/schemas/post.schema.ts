import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ default: null })
  imageUrl?: string;

  @Prop({ required: true })
  userId: string;

  // 👍 Likes (array of userIds)
  @Prop({ type: [String], default: [] })
  likes: string[];

  // 💬 Comments
  @Prop({
    type: [
      {
        userId: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  comments: {
    userId: string;
    text: string;
    createdAt: Date;
  }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
