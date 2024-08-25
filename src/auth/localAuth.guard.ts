import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { LoginUserDto } from '../users/dto/loginUser.dto';

// используется только для получения jwt токена

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const loginUserDto = plainToInstance(LoginUserDto, request.body);
    
        const errors = await validate(loginUserDto);
        if (errors.length > 0) {
            // чтоб было красивенько и понятненько
            const errorsFormatted = errors.map((err: ValidationError) => {
                return Object.values(err.constraints).join(', ');
            })
          throw new UnauthorizedException(`Validation failed with following errors: ${errorsFormatted.join('; ')}`);
        }
    
        return super.canActivate(context) as Promise<boolean>;
      }
}