"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RequestResponseMappings_1 = __importDefault(require("../utils/Mappings/RequestResponseMappings"));
exports.default = {
    isAuthenticated: (req, res, next) => {
        var _a;
        try {
            let token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                next();
            }
        }
        catch (e) {
            return RequestResponseMappings_1.default.sendErrorMessage(res, {}, e.message, 401);
        }
    }
};
