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
const passport = require("passport");
const Interactors_1 = require("../interactors/Interactors");
const express = require("express");
const failedResponse = {
    success: false,
    data: 'Request body is empty or null'
};
exports.default = (app) => {
    const interactors = new Interactors_1.default();
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            req.login(user, (err) => {
                console.log('LOGIN');
                res.send({
                    success: true,
                    data: user
                });
                if (err) {
                    res.send({
                        success: false,
                        data: 'login failed'
                    });
                }
            });
        })(req, res, next);
    });
    app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        if (user) {
            const signUpResponse = yield interactors.signUp(user);
            res.send(signUpResponse);
        }
        else {
            res.send({
                success: false,
                data: 'User info provided is null'
            });
        }
    }));
    app.get('/getCurrentUser', (req, res) => {
        const loggedIn = req.isAuthenticated();
        if (loggedIn) {
            res.send({
                success: true,
                data: Object.assign(Object.assign({}, req.user), { loggedIn })
            });
        }
        else {
            res.send({
                success: true,
                data: { loggedIn }
            });
        }
    });
    app.use((req, res, next) => {
        const userAuthenticated = req.isAuthenticated();
        if (userAuthenticated) {
            next();
        }
        else {
            res.send({
                success: false,
                data: 'User not authenticated'
            });
        }
    });
    app.post('/removeUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteeId = req.body.deleteeId;
        if (deleteeId) {
            const removalInfo = {
                deleterId: req.user.id,
                deleteeId
            };
            const removeResponse = yield interactors.removeUser(removalInfo);
            res.send(removeResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/addProject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const projectData = body;
            projectData.users.push(req.user.id);
            const addResponse = yield interactors
                .addNewProject(projectData);
            res.send(addResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/addTicket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const ticketData = body;
            const addResponse = yield interactors
                .addNewTicket(ticketData);
            res.send(addResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/setTicketUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const ticketData = body;
            const addResponse = yield interactors
                .setTicketUser(ticketData);
            res.send(addResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/addCommentToTicket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const commentData = body;
            commentData.userId = req.user.id;
            const commentResponse = yield interactors
                .addCommentToTicket(commentData);
            res.send(commentResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/getCommentsForTicket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const { ticketId } = body;
            const commentResponse = yield interactors
                .getCommentsForTicket(ticketId);
            res.send(commentResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/getCurrentUserTickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const ticketData = {
                userid: req.user.id,
                projectid: body.projectId
            };
            const ticketResponse = yield interactors
                .getCurrentUserTicketsForProject(ticketData);
            res.send(ticketResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/getAllTicketsForProject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const { projectId } = body;
            const ticketResponse = yield interactors
                .getAllTicketsForProject(projectId);
            res.send(ticketResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/completeTicket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const { ticketId } = body;
            const completeResponse = yield interactors
                .completeTicketWithId(ticketId);
            res.send(completeResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.post('/getTicketAttachments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const { ticketId } = body;
            const getResponse = yield interactors
                .getAttachementsOfTicket(ticketId);
            res.send(getResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.get('/getTicketStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getResponse = yield interactors
            .getAllTicketStats();
        res.send(getResponse);
    }));
    app.use('/file', express.static(process.cwd() + '/fileStorage'));
    app.get('/getAllUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield interactors
            .getAllUsers();
        res.send(result);
    }));
    app.get('/getAllProjectsForUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getResponse = yield interactors
            .getAllProjectsForUser(req.user.id);
        res.send(getResponse);
    }));
    app.post('/getUsersForProject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        if (body) {
            const { projectId } = body;
            const getResponse = yield interactors
                .getUsersForProject(projectId);
            res.send(getResponse);
        }
        else {
            res.send(failedResponse);
        }
    }));
    app.get('/logout', (req, res) => {
        if (req.user) {
            req.logout();
            res.send({ success: true, data: null });
        }
        else {
            res.send({ success: false, data: 'you are not logged In' });
        }
    });
};
