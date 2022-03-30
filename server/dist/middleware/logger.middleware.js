"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
class loggerMiddleware {
    use(req, res, next) {
        console.log(req.cookie);
        if (!req.cookie) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        console.log('Request...');
        next();
    }
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map