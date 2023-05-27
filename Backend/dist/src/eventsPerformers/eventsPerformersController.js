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
exports.updateEventPerformer = exports.deleteEventPerformer = exports.getEventsPerformers = exports.addEventPerformer = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./eventsPerformersQueries"));
const addEventPerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id, performer_id } = req.body;
        const newEventPerformer = yield db_1.default.query(queries.addEventPerformer, [event_id, performer_id]);
        return res.status(201).json(newEventPerformer.rows[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addEventPerformer = addEventPerformer;
const getEventsPerformers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getEventsPerformers, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.getEventsPerformers = getEventsPerformers;
const deleteEventPerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event_id = parseInt(req.params.event_id);
        const performer_id = parseInt(req.params.performer_id);
        const eventPerformer = yield db_1.default.query(queries.getEventPerformerById, [event_id, performer_id]);
        if (!eventPerformer.rows.length) {
            res.status(400).json({ message: "eventPerformer does not exist" });
        }
        else {
            db_1.default.query(queries.deleteEventPerformer, [event_id, performer_id]);
            res.status(200).json({ message: "Successfully deleted." });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.deleteEventPerformer = deleteEventPerformer;
const updateEventPerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event_id = parseInt(req.params.event_id);
        const performer_id = parseInt(req.params.performer_id);
        const { new_event_id, new_performer_id } = req.body;
        console.log("event: " + new_event_id + "\nperformer: " + new_performer_id);
        const eventPerformer = yield db_1.default.query(queries.getEventPerformerById, [event_id, performer_id]);
        if (!eventPerformer.rows.length) {
            res.status(400).json({ message: "eventPerformer does not exist. (Non existent id)" });
        }
        else {
            const newEventPerformer = yield db_1.default.query(queries.updateEventPerformer, [new_event_id, new_performer_id, event_id, performer_id]);
            res.json(newEventPerformer.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateEventPerformer = updateEventPerformer;
