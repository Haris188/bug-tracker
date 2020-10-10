"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Comment_1 = require("./Comment");
class CommentFactory {
    createCommentFromData(commentData) {
        return new Comment_1.default(commentData);
    }
    createCommentFromDataWithId(commentData) {
        commentData.id = uuid_1.v4();
        return this.
            createCommentFromData(commentData);
    }
}
exports.default = CommentFactory;
