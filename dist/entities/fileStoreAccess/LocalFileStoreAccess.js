"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs = require("fs");
const fsOpen = util_1.promisify(fs.open);
const fsWrite = util_1.promisify(fs.write);
const fsMkDir = util_1.promisify(fs.mkdir);
class LocalFileStoreAccess {
    setIfNotCreateRef(path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.originalPath = path;
            this.ref = `${process.cwd()}/fileStorage/${path}`;
            const dirExists = this.checkDirExists();
            if (dirExists) {
                return yield this.openDir();
            }
            else {
                const createDirRes = yield this.createDir();
                return createDirRes.success
                    ? this.openDir()
                    : createDirRes;
            }
        });
    }
    write(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const writeRes = yield fsWrite(this.openedFile, buffer);
                return {
                    success: true,
                    data: null
                };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    data: null
                };
            }
        });
    }
    generateUrl(serverUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                success: true,
                data: `${serverUrl}/file/${this.originalPath}`
            };
        });
    }
    checkDirExists() {
        const path = this.createDirPathFromRef();
        return fs.existsSync(path);
    }
    createDir() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dirPath = this.createDirPathFromRef();
                yield fsMkDir(dirPath);
                return {
                    success: true,
                    data: null
                };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    data: null
                };
            }
        });
    }
    openDir() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield fsOpen(this.ref, 'w');
                this.openedFile = file;
                return {
                    success: true,
                    data: null
                };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    data: null
                };
            }
        });
    }
    createDirPathFromRef() {
        const refInParts = this.ref.split('/');
        refInParts.pop();
        let path = '';
        refInParts.forEach((part, i) => {
            if (i !== 0) {
                path = path + `/${part}`;
            }
        });
        return path;
    }
}
exports.default = LocalFileStoreAccess;
