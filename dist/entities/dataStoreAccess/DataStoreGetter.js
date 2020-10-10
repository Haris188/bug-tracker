"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestDataStoreAccess_1 = require("./TestDataStoreAccess");
const PgDataStoreAccess_1 = require("./PgDataStoreAccess");
const dotenv = require("dotenv");
dotenv.config();
class DataStoreGetter {
    getAccordingToEnv() {
        return process.env.NODE_ENV === 'test'
            ? new TestDataStoreAccess_1.default()
            : new PgDataStoreAccess_1.default();
    }
}
exports.default = DataStoreGetter;
