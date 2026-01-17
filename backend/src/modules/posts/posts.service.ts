import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
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
      imageUrl, // ✅ undefined is OK
      userId,
    });
  }

  async findAll() {
    return this.postModel
      .find()
      .sort({ createdAt: -1 }) // newest first
      .exec();
  }

  async findOne(id: string) {
    return this.postModel.findById(id).exec();
  }
}
