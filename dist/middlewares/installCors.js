"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
exports.default = (app) => {
    app.use(cors({
        credentials: true,
        origin: true
    }));
};
