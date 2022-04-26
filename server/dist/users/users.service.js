"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../utils");
const handleResponse_1 = require("../utils/handleResponse");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const checkUser = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });
        if (checkUser) {
            return (0, handleResponse_1.failResponse)(null, '用户名已存在');
        }
        createUserDto.isDelete = false;
        console.log(createUserDto);
        const res = await this.userRepository.save(createUserDto);
        return (0, handleResponse_1.successResponse)(res, '注册成功');
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            return utils_1.HandleResp.successResponse(user);
        }
    }
    findAll() {
        return this.userRepository.find({ where: { isDelete: false } });
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async update(id, updateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }
    remove(id) {
        return this.userRepository.delete({ id });
    }
    async changePsd(data) {
        const { uid, oldPsd, newPsd } = data;
        const user = await this.userRepository.findOne({ where: { id: uid } });
        console.log(user);
        if (user.password !== oldPsd) {
            return utils_1.HandleResp.failResponse({}, '原密码错误');
        }
        this.userRepository.update(uid, { password: newPsd });
        return utils_1.HandleResp.successResponse({}, '更新成功');
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map