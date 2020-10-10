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
const QueryCreator_1 = require("./QueryCreator");
const submitQuery_1 = require("./submitQuery");
class PgDataStoreAccess {
    constructor() {
        this.queryCreator = new QueryCreator_1.default();
    }
    setIfNotCreateRef(path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ref = path;
            const readRefResponse = yield this.readWhere({});
            return readRefResponse.success
                ? readRefResponse
                : yield this
                    .setTableCreatedFlagIfNoTable(readRefResponse.data);
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = Object.keys(data);
            const createColumnResponse = yield this.createColumnsIfNotExist(columns);
            return createColumnResponse.success
                ? yield this
                    .insertDataIntoColumns(data)
                : createColumnResponse;
        });
    }
    readWhere(whereFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.queryCreator
                .getReadWhereQuery(this.ref, whereFields);
            return yield submitQuery_1.default(query);
        });
    }
    updateWhere(updateData, whereFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.queryCreator
                .getUpdateWhereQuery(this.ref, updateData, whereFields);
            return yield submitQuery_1.default(query);
        });
    }
    deleteWhere(whereFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.queryCreator
                .getDeleteWhereQuery(this.ref, whereFields);
            return yield submitQuery_1.default(query);
        });
    }
    setTableCreatedFlagIfNoTable(errData) {
        return __awaiter(this, void 0, void 0, function* () {
            const relationNotFoundErr = errData
                && errData.code
                && errData.code === '42P01';
            if (relationNotFoundErr) {
                return yield this.createRefAtGivenPath();
            }
            else {
                return {
                    success: false,
                    data: 'relation could not be created'
                };
            }
        });
    }
    createRefAtGivenPath() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this
                .queryCreator
                .getCreateRefQueryForPath(this.ref);
            return yield submitQuery_1.default(query);
        });
    }
    createColumnsIfNotExist(columns) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.queryCreator
                .getCreateColumnsQuery(this.ref, columns);
            return yield submitQuery_1.default(query);
        });
    }
    insertDataIntoColumns(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.queryCreator
                .getInsertQueryForData(this.ref, data);
            return yield submitQuery_1.default(query);
        });
    }
}
exports.default = PgDataStoreAccess;
