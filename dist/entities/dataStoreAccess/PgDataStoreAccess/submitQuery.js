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
const pool_1 = require("./pool");
exports.default = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    try {
        const queryResult = yield pool_1.default.query(query);
        console.log('SUBMIT QUERY ::->');
        console.log(queryResult.rows);
        return { success: true, data: queryResult.rows };
    }
    catch (e) {
        console.log(e);
        return { success: false, data: e };
    }
});
