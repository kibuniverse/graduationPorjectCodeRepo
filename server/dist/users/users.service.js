"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            { userId: 1, userName: 'a', password: 'abc' },
            { userId: 2, userName: 'b', password: 'abc' },
        ];
    }
    async findOne(userName) {
        return this.users.find((user) => user.userName === userName);
    }
    async register(userName, password, email) {
        const user = { userId: this.users.length + 1, userName, password, email };
        this.users.push(user);
        return user;
    }
    async findAll() {
        return this.users;
    }
    async login(userName, password) {
        const user = this.users.find((user) => user.userName === userName);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map