"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureEnvironment = void 0;
const config_1 = require("@nestjs/config");
const configureEnvironment = () => {
    return config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    });
};
exports.configureEnvironment = configureEnvironment;
//# sourceMappingURL=config.js.map