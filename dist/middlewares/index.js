"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const installInterfaceBoundary_1 = require("./installInterfaceBoundary");
const installCors_1 = require("./installCors");
const installParsers_1 = require("./installParsers");
const installPassport_1 = require("./installPassport");
const installSession_1 = require("./installSession");
const installMulter_1 = require("./installMulter");
exports.default = {
    installInterfaceBoundary: installInterfaceBoundary_1.default,
    installCors: installCors_1.default,
    installParsers: installParsers_1.default,
    installPassport: installPassport_1.default,
    installSession: installSession_1.default,
    installMulter: installMulter_1.default
};
