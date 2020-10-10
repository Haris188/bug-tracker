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
const multer = require("multer");
const Interactors_1 = require("../interactors/Interactors");
const storage = multer.memoryStorage();
const upload = multer({
    storage
});
const sendFileToInteractor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield new Interactors_1.default()
        .addAttachmentToTicketWithId({
        meta: {
            name: req.file.originalname,
            type: req.file.mimetype,
            ticketId: req.body.ticketId,
            serverUrl: `${req.protocol}://${req.get('host')}`
        },
        file: {
            buffer: req.file.buffer
        }
    });
    res.send(result);
});
exports.default = (app) => {
    app.post('/fileupload', upload.single('file'), sendFileToInteractor);
};
