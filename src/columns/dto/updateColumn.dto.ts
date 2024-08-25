import { PartialType } from '@nestjs/swagger';
import { CreateColumnDto } from './createColumn.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}