"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.getCommentByDiscussion = exports.getCommentByUser = exports.getCommentById = exports.getComment = exports.postComment = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./commentQueries"));
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, post_date, user_id, discussion_id } = req.body;
        const userInDatabase = yield db_1.default.query(queries.checkUserExists, [user_id]);
        const discussionInDatabase = yield db_1.default.query(queries.checkDiscussionExists, [discussion_id]);
        if (userInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "User does not exist." });
        }
        else if (discussionInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Discussion does not exist." });
        }
        else {
            const newComment = yield db_1.default.query(queries.addComment, [content, post_date, user_id, discussion_id]);
            return res.status(201).json(newComment.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postComment = postComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getComment, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getComment = getComment;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        db_1.default.query(queries.getCommentById, [id], (error, results) => {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Comment does not exist." });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getCommentById = getCommentById;
const getCommentByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const comment = yield db_1.default.query(queries.getCommentByUser, [id]);
        return res.status(200).json(comment.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getCommentByUser = getCommentByUser;
const getCommentByDiscussion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const comment = yield db_1.default.query(queries.getCommentByUser, [id]);
        return res.status(200).json(comment.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getCommentByDiscussion = getCommentByDiscussion;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const comment = yield db_1.default.query(queries.getCommentById, [id]);
        if (!comment.rows.length) {
            return res.status(400).json({ message: "Comment does not exist." });
        }
        else {
            db_1.default.query(queries.deleteComment, [id], (error, results) => {
                if (error)
                    throw error;
                res.status(200).json({ message: "Successfully deleted" });
            });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deleteComment = deleteComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { content, post_date, user_id, discussion_id } = req.body;
        const comment = yield db_1.default.query(queries.getCommentById, [id]);
        if (!comment.rows.length) {
            return res.status(400).json({ message: "Comment does not exist." });
        }
        else {
            const newComment = yield db_1.default.query(queries.updateComment, [content, post_date, user_id, discussion_id, id]);
            return res.json(newComment.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateComment = updateComment;
