import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';

// guard для контроля владельца карточки/коммента/колонки
// проверяет папаметр user_id, поэтому необходимо некоторого уровня соглашение

@Injectable()
export class OwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userIdFromParam = parseInt(request.params.user_id, 10);

        if (!user) {
            // такого случая не должно быть, т.к. должен обязательно
            // быть jwt guard перед ним
            throw new UnauthorizedException('Not authorized');
        }

        if (user.userId !== userIdFromParam) {
            throw new ForbiddenException('You do not have access to this resource');
        }

        return true;
    }
}