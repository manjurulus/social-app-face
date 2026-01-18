// src/modules/posts/posts.controller.ts
import {
  Controller,
  Post as HttpPost,
  Get,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() body: { content: string; userId: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.postsService.create(body.content, body.userId, file);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // Like a post
  @HttpPost(':id/like')
  like(@Param('id') id: string, @Body('userId') userId: string) {
    return this.postsService.toggleLike(id, userId);
  }

  // Comment on a post
  @HttpPost(':id/comment')
  comment(
    @Param('id') id: string,
    @Body() body: { userId: string; text: string },
  ) {
    return this.postsService.addComment(id, body.userId, body.text);
  }
}
