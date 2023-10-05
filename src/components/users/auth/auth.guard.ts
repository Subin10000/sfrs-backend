import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){};
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try{
            const request = context.switchToHttp().getRequest();
            const token = request.headers.cookie.substr(4);
            console.log(request.user);
            if(!token){
            throw new UnauthorizedException();
            }
            request.cookies.jwt = this.jwtService.verify(token);
        } catch(error){
            console.log(error);
            throw new UnauthorizedException();
        }
        return false;
    }
}