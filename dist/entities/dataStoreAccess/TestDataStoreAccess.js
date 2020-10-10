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
const lodash_1 = require("lodash");
class TestDataStoreAccess {
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            TestDataStoreAccess.dataStore[this.ref]
                .push(data);
            console.log(TestDataStoreAccess.dataStore);
            return { success: true, data: null };
        });
    }
    setIfNotCreateRef(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.findRef(path);
            return ref
                ? this.setRef(path)
                : this.createRef(path);
        });
    }
    readWhere(argsObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const refRecords = TestDataStoreAccess
                .dataStore[this.ref];
            const foundRecord = lodash_1.filter(refRecords, argsObj);
            return {
                success: (foundRecord !== null),
                data: foundRecord
            };
        });
    }
    deleteWhere(argsObj) {
        return __awaiter(this, void 0, void 0, function* () {
            lodash_1.remove(TestDataStoreAccess
                .dataStore[this.ref], (i) => (lodash_1.isMatch(i, argsObj)));
            return {
                success: true,
                data: null
            };
        });
    }
    updateWhere(updateData, whereFields) {
        return __awaiter(this, void 0, void 0, function* () {
            TestDataStoreAccess.dataStore[this.ref]
                .forEach((ticket, index) => {
                if (lodash_1.isMatch(ticket, whereFields)) {
                    TestDataStoreAccess.dataStore[this.ref][index]
                        = Object.assign(Object.assign({}, TestDataStoreAccess.dataStore[this.ref][index]), updateData);
                }
            });
            console.log(TestDataStoreAccess.dataStore);
            return { success: true, data: null };
        });
    }
    findRef(path) {
        const ref = TestDataStoreAccess.dataStore[path];
        return ref;
    }
    setRef(path) {
        this.ref = path;
        return { success: true, data: null };
    }
    createRef(path) {
        TestDataStoreAccess.dataStore[path] = [];
        this.ref = path;
        return { success: true, data: null };
    }
}
TestDataStoreAccess.dataStore = {
    accounts: [
        {
            id: '1',
            email: 'haris@gmail.com',
            password: 'anypass',
            role: 'developer',
            name: 'haris'
        },
        {
            id: '2',
            email: 'ahmad@gmail.com',
            password: 'anypass',
            role: 'developer',
            name: 'ahmad'
        },
        {
            id: '5',
            email: 'ahmad@gmail.com',
            password: 'anypass',
            role: 'admin',
            name: 'ahmad'
        }
    ],
    developers: [
        {
            id: '1',
            softwareDone: 1
        }
    ],
    tickets: [
        {
            problem: 'Submit button not working',
            description: 'description',
            priority: 'high',
            userId: '1',
            projectId: '2',
            id: '1',
            completed: false
        },
        {
            problem: 'Alert dialog not opening',
            description: 'description',
            priority: 'low',
            userId: '2',
            projectId: '2',
            id: '4af5a79b-c3c4-40c9-ae42-16f9bf887435',
            completed: false
        }
    ],
    comments: [
        {
            ticketId: '1',
            comment: 'Getting this error while screen on as well',
            userId: '1',
            id: '698bfd31-f418-4a7f-81a6-e440d3ad8465'
        }
    ],
    'ticket_4af5a79b-c3c4-40c9-ae42-16f9bf887435_attachments': [
        {
            path: 'http://pathtofile.com/paht'
        }
    ],
    projects: [
        {
            id: '1',
            name: 'A test project',
            description: 'A test description'
        }
    ],
    '"id_1_projects"': [
        {
            projectId: '1'
        }
    ]
};
exports.default = TestDataStoreAccess;
