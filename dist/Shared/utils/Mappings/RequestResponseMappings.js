"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sendSuccessMessage: (res, body = {}, message = "Action Performed Successfully", status = 200) => {
        return res.send({ body, message, status });
    },
    sendErrorMessage: (res, description = {}, message = "Action Could not be performed", status = 500) => {
        return res.send({ description, message, status });
    }
};
