// src/modules/posts/posts.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly uploadService: UploadService,
  ) {}

  // ✅ Note: userId is required, file is optional
  async create(content: string, userId: string, file?: Express.Multer.File) {
    let imageUrl: string | null = null;

    if (file) {
      try {
        imageUrl = await this.uploadService.uploadFile(file);
      } catch (err) {
        throw new BadRequestException('Image upload failed');
      }
    }

    const newPost = new this.postModel({ content, userId, imageUrl });
    return newPost.save();
  }

  async findAll() {
    return this.postModel.find().sort({ createdAt: -1 }).exec(); // latest first
  }

  async toggleLike(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new BadRequestException('Post not found');

    const index = post.likes.indexOf(userId);
    if (index > -1) {
      post.likes.splice(index, 1); // remove like
    } else {
      post.likes.push(userId); // add like
    }

    return post.save();
  }

  async addComment(postId: string, userId: string, text: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new BadRequestException('Post not found');

    post.comments.push({ userId, text, createdAt: new Date() });
    return post.save();
  }
}
