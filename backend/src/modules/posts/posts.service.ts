import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    content: string,
    file: Express.Multer.File | undefined,
    userId: string,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = await this.uploadService.uploadFile(file);
    }

    return this.postModel.create({
      content,
      imageUrl,
      userId,
    });
  }

  async findAll() {
    return this.postModel.find().sort({ createdAt: -1 }).exec();
  }

  // 👍 Like / Unlike
  async toggleLike(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    return post.save();
  }

  // 💬 Comment
  async addComment(postId: string, userId: string, text: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    post.comments.push({ userId, text, createdAt: new Date() });
    return post.save();
  }
}
