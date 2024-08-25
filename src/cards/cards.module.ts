import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Card } from './models/card.model';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Card]), 
    AuthModule, 
  ],
  controllers: [CardsController], 
  providers: [CardsService],  
  exports: [CardsService]
})
export class CardsModule {}