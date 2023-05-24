"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const User_1 = require("../modules/Authentication/models/User");
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "DB_USER",
    entities: [User_1.User],
    synchronize: true,
    logging: false
});
