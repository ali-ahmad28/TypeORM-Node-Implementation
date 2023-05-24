"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthenticationMiddleware_1 = __importDefault(require("../../../Shared/Middleware/AuthenticationMiddleware"));
const userRouter = (0, express_1.default)();
userRouter.get('/', AuthenticationMiddleware_1.default.isAuthenticated, UserController_1.default.getUser);
userRouter.post('/login', UserController_1.default.loginUser);
userRouter.post('/', UserController_1.default.register);
userRouter.put('/', UserController_1.default.updateUser);
userRouter.delete('/', UserController_1.default.deleteUser);
exports.default = userRouter;
