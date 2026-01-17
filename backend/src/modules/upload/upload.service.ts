import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(
    @Inject('Cloudinary')
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file?.buffer) {
      throw new BadRequestException('Invalid file buffer');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder: 'posts' },
        (error, result) => {
          if (error || !result) {
            return reject(new BadRequestException('Image upload failed'));
          }
          resolve(result.secure_url);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
