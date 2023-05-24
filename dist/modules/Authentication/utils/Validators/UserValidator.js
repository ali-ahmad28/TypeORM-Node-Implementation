"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    id: joi_1.default.number(),
    password: joi_1.default
        .string().required().min(5).max(20),
    email: joi_1.default
        .string().email().required()
});
