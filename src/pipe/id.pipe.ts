// пайп для валидации serial id чего-либо

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val) || val <= 0 || val > 2147483647) {
      throw new BadRequestException('Invalid ID');
    }
    return val;
  }
}