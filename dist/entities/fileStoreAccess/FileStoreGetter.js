"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalFileStoreAccess_1 = require("./LocalFileStoreAccess");
class FileStoreGetter {
    getAccordingToEnv() {
        return new LocalFileStoreAccess_1.default();
    }
}
exports.default = FileStoreGetter;
