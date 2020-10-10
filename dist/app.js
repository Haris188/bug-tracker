"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const middlewares_1 = require("./middlewares");
dotenv.config();
exports.default = () => {
    const app = express();
    const port = process.env.PORT;
    middlewares_1.default.installParsers(app);
    middlewares_1.default.installSession(app);
    middlewares_1.default.installPassport(app);
    middlewares_1.default.installCors(app);
    middlewares_1.default.installMulter(app);
    middlewares_1.default.installInterfaceBoundary(app);
    app.listen(port, () => {
        console.log(`Server has started on port ${port}`);
    });
};
