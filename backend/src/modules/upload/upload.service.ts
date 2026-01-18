// src/modules/upload/upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new BadRequestException('No file provided'));

      Cloudinary.uploader
        .upload_stream({ folder: 'posts' }, (error, result) => {
          if (error || !result)
            return reject(new BadRequestException('Image upload failed'));
          resolve(result.secure_url);
        })
        .end(file.buffer); // 🔥 use buffer instead of file.path
    });
  }
}
