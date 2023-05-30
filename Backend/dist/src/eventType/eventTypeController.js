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
exports.updateEventType = exports.deleteEventType = exports.getEventTypeByID = exports.getEventType = exports.postEventType = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./eventTypeQueries"));
const postEventType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventTypeName } = req.body;
        const newEventType = yield db_1.default.query(queries.addEventType, [eventTypeName]);
        res.json(newEventType.rows[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.postEventType = postEventType;
const getEventType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getEventType, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventType = getEventType;
const getEventTypeByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getEventTypeById, [id], (error, results) => {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Event Type does not exist. (Non existent id)" });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventTypeByID = getEventTypeByID;
const deleteEventType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const eventType = yield db_1.default.query(queries.getEventTypeById, [id]);
        if (!eventType.rows.length) {
            res.status(400).json({ message: "Event Type does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteEventType, [id], (error, results) => {
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
exports.deleteEventType = deleteEventType;
const updateEventType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { eventTypeName } = req.body;
        const eventType = yield db_1.default.query(queries.getEventTypeById, [id]);
        if (!eventType.rows.length) {
            res.status(400).json({ message: "Event type does not exist. (Non existent id" });
        }
        else {
            const newEventType = yield db_1.default.query(queries.updateEventType, [eventTypeName, id]);
            res.json(newEventType.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateEventType = updateEventType;
