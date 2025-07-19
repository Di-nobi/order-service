"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtHelper {
    static async signToken(user) {
        const payload = {
            id: user._id,
        };
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
    }
}
exports.JwtHelper = JwtHelper;
//# sourceMappingURL=jwt.helper.js.map