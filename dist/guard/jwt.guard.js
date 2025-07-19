"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let JwtGuard = class JwtGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader)
            throw new common_1.UnauthorizedException('No authorization header');
        const token = authHeader.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('No token provided');
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            request.user = decoded;
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)()
], JwtGuard);
//# sourceMappingURL=jwt.guard.js.map