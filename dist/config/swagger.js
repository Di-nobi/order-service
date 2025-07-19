"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
function setupSwagger(app) {
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(configService.get('SWAGGER_API_NAME') || 'Order Service')
        .setDescription(configService.get('SWAGGER_API_DESCRIPTION') || 'Authentication service')
        .setVersion(configService.get('SWAGGER_API_CURRENT_VERSION') || '1.0')
        .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'Api-Key')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(configService.get('SWAGGER_API_ROOT') || 'api', app, document);
}
//# sourceMappingURL=swagger.js.map