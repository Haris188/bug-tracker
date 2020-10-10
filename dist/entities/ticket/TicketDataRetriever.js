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
const DataStoreGetter_1 = require("../dataStoreAccess/DataStoreGetter");
class TicketDataRetriever {
    constructor() {
        this.dataStore = new DataStoreGetter_1.default()
            .getAccordingToEnv();
    }
    getAllTicketsWhere(ticketData) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRefResponse = yield this
                .dataStore.
                setIfNotCreateRef('tickets');
            return setRefResponse.success
                ? yield this.dataStore
                    .readWhere(ticketData)
                : setRefResponse;
        });
    }
    getAllTicketStats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fixed = yield this
                    .getAllTicketsWhere({ completed: "true" });
                const notFixed = yield this
                    .getAllTicketsWhere({ completed: "false" });
                const lowPr = yield this
                    .getAllTicketsWhere({ priority: 'low' });
                const mediumPr = yield this
                    .getAllTicketsWhere({ priority: 'medium' });
                const highPr = yield this
                    .getAllTicketsWhere({ priority: 'high' });
                return {
                    success: true,
                    data: {
                        fixed: fixed.data.length,
                        notFixed: notFixed.data.length,
                        lowPr: lowPr.data.length,
                        mediumPr: mediumPr.data.length,
                        highPr: highPr.data.length,
                    }
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
}
exports.default = TicketDataRetriever;
