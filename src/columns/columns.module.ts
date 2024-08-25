import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { AuthModule } from '../auth/auth.module';
import { BoardColumn } from './models/column.model';

@Module({
  imports: [
    SequelizeModule.forFeature([BoardColumn]), 
    AuthModule, 
  ],
  controllers: [ColumnsController], 
  providers: [ColumnsService],  
  exports: [ColumnsService]
})
export class ColumnsModule {}