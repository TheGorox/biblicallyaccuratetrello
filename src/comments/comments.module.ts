import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Comment } from './models/comment.model';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]), 
    AuthModule, 
  ],
  controllers: [CommentsController], 
  providers: [CommentsService],  
  exports: [CommentsService]
})
export class CommentsModule {}