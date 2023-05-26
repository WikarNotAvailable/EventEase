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
exports.updateTicketType = exports.deleteTicketType = exports.getTicketTypeById = exports.getTicketTypes = exports.postTicketType = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./ticketTypeQueries"));
const postTicketType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        const newTicketType = yield db_1.default.query(queries.addTicketType, [type]);
        res.json(newTicketType.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.postTicketType = postTicketType;
const getTicketTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getTicketTypes, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTicketTypes = getTicketTypes;
const getTicketTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getTicketTypeById, [id], (error, results) => {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows);
            }
            else {
                res.status(400).json({ message: "Ticket type does not exist. (Non existent id)" });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTicketTypeById = getTicketTypeById;
const deleteTicketType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const ticketType = yield db_1.default.query(queries.getTicketTypeById, [id]);
        if (!ticketType.rows.length) {
            res.status(400).json({ message: "Ticket type does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteTicketTypeById, [id], (error, results) => {
                if (error)
                    throw error;
                res.status(200).json({ message: "Successfully deleted." });
            });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deleteTicketType = deleteTicketType;
const updateTicketType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { type } = req.body;
        const ticketType = yield db_1.default.query(queries.getTicketTypeById, [id]);
        if (!ticketType.rows.length) {
            res.status(400).json({ message: "Ticket type does not exist. (Non existent id)" });
        }
        else {
            const newTicketType = yield db_1.default.query(queries.updateTicketType, [type, id]);
            res.json(newTicketType.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateTicketType = updateTicketType;
