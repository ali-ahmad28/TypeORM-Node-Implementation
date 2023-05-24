"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./connections/connection");
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
routes_1.default.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/', routes_1.default);
routes_1.default.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
routes_1.default.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
connection_1.dataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
});
