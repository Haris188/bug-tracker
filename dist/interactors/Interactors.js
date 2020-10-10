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
const UserFactory_1 = require("../entities/user/UserFactory");
const ProjectFactory_1 = require("../entities/project/ProjectFactory");
const TicketFactory_1 = require("../entities/ticket/TicketFactory");
const CommentFactory_1 = require("../entities/comment/CommentFactory");
const TicketDataRetriever_1 = require("../entities/ticket/TicketDataRetriever");
const AttachmentFactory_1 = require("../entities/attachment/AttachmentFactory");
const UserDataRetriever_1 = require("../entities/user/UserDataRetriever");
const ProjectDataRetriever_1 = require("../entities/project/ProjectDataRetriever");
const invalidUserResponse = {
    success: false,
    data: 'Invalid UserData provided to UserFactory'
};
class Interactors {
    constructor() {
        this.userFactory = new UserFactory_1.default();
        this.projectFactory = new ProjectFactory_1.default();
        this.ticketFactory = new TicketFactory_1.default();
        this.commentFactory = new CommentFactory_1.default();
        this.ticketDataRetriever = new TicketDataRetriever_1.default();
        this.attachmentFactory = new AttachmentFactory_1.default();
        this.userDataRetriever = new UserDataRetriever_1.default();
        this.projectDataRetriver = new ProjectDataRetriever_1.default();
    }
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this
                    .userFactory
                    .createUserFromDataWithId(userData);
                const res = yield user.signUp();
                return res;
            }
            catch (error) {
                console.log(error);
                return invalidUserResponse;
            }
        });
    }
    getUserWithEmailPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this
                    .userFactory
                    .retrieveWithEmailPassword(email, password);
                return user
                    .getData();
            }
            catch (error) {
                console.log(error);
                return invalidUserResponse;
            }
        });
    }
    getUserWithId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this
                .userFactory
                .retrieveWithUserId(id);
            return user
                ? user.getData()
                : { success: false, data: null };
        });
    }
    removeUser(deletionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { deleterId, deleteeId } = deletionData;
                const deleleter = yield this
                    .userFactory
                    .retrieveWithUserId(deleterId);
                const deletee = yield this
                    .userFactory
                    .retrieveWithUserId(deleteeId);
                const deleterIsAdmin = deleleter.getRole() === 'admin';
                return deleterIsAdmin
                    ? yield deletee.delete()
                    : {
                        success: false,
                        data: 'Deleter is not admin'
                    };
            }
            catch (error) {
                console.log(error);
                return invalidUserResponse;
            }
        });
    }
    addNewProject(projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectToCreate = this
                .projectFactory
                .createProjectFromDataWithId(projectData);
            return yield projectToCreate.create();
        });
    }
    addNewTicket(ticketData) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketToCreate = this
                .ticketFactory
                .createTicketFromDataWithId(ticketData);
            return yield ticketToCreate.create();
        });
    }
    setTicketUser(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketToUpdate = yield this
                .ticketFactory
                .retrieveTicketWithId(updateData.ticketId);
            return ticketToUpdate
                ? yield ticketToUpdate
                    .setUser(updateData.userId)
                : { success: false, data: 'No Ticket found with id' };
        });
    }
    addCommentToTicket(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = this
                .commentFactory
                .createCommentFromDataWithId(commentData);
            return yield comment.save();
        });
    }
    getCommentsForTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this
                .ticketFactory
                .retrieveTicketWithId(ticketId);
            return yield ticket.getAllComments();
        });
    }
    getCurrentUserTicketsForProject(ticketData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this
                .userFactory
                .retrieveWithUserId(ticketData.userid);
            return yield user.getTicketsForProject(ticketData.projectid);
        });
    }
    getAllTicketsForProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this
                .ticketDataRetriever
                .getAllTicketsWhere({
                projectId
            });
        });
    }
    completeTicketWithId(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketToUpdate = yield this
                .ticketFactory
                .retrieveTicketWithId(ticketId);
            return yield ticketToUpdate.complete();
        });
    }
    addAttachmentToTicketWithId(attachmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const attachmentToAdd = this
                .attachmentFactory
                .createAttachementFromDataWithId(attachmentData);
            return yield attachmentToAdd.add();
        });
    }
    getAttachementsOfTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketToWorkWith = yield this
                .ticketFactory
                .retrieveTicketWithId(ticketId);
            return yield ticketToWorkWith
                .getAllAttachments();
        });
    }
    getAllTicketStats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ticketDataRetriever
                .getAllTicketStats();
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this
                .userDataRetriever
                .getAllUsers();
        });
    }
    getAllProjectsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this
                .userFactory
                .retrieveWithUserId(userId);
            return yield user.getAllProject();
        });
    }
    getUsersForProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersIdsObjs = yield this
                .projectDataRetriver
                .getUsersForProject(projectId);
            const users = usersIdsObjs.success
                && usersIdsObjs.data.map((obj) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield this
                        .getUserWithId(obj.userid);
                    return user.data.accountData;
                }));
            return usersIdsObjs.success
                ? { success: true, data: yield Promise.all(users) }
                : usersIdsObjs;
        });
    }
}
exports.default = Interactors;
