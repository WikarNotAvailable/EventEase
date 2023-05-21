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
exports.updatePerformer = exports.deletePerformer = exports.getPerformerById = exports.getPerformers = exports.addPerformer = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./performerQueries"));
const addPerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { performertype_id, name, description } = req.body;
        const performerNameExists = yield db_1.default.query(queries.checkPerformerNameExists, [name]);
        if (performerNameExists.rows.length) {
            return res.status(400).json({ message: 'Performer name already exists.' });
        }
        else {
            const newPerformer = yield db_1.default.query(queries.addPerformer, [
                performertype_id,
                name,
                description,
            ]);
            return res.status(201).json(newPerformer.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.addPerformer = addPerformer;
const getPerformers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const performers = yield db_1.default.query(queries.getPerformers);
        return res.status(200).json(performers.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPerformers = getPerformers;
const getPerformerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const performer = yield db_1.default.query(queries.getPerformerById, [id]);
        if (performer.rows.length) {
            return res.status(200).json(performer.rows);
        }
        else {
            return res.status(400).json({ message: 'Performer does not exist.' });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPerformerById = getPerformerById;
const deletePerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const performer = yield db_1.default.query(queries.getPerformerById, [id]);
        if (!performer.rows.length) {
            return res.status(400).json({ message: 'Performer does not exist.' });
        }
        else {
            yield db_1.default.query(queries.deletePerformer, [id]);
            return res.status(200).json({ message: 'Performer successfully deleted.' });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deletePerformer = deletePerformer;
const updatePerformer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { performertype_id, name, description } = req.body;
        const performer = yield db_1.default.query(queries.getPerformerById, [id]);
        if (!performer.rows.length) {
            return res.status(400).json({ message: 'Performer does not exist.' });
        }
        else {
            const updatedPerformer = yield db_1.default.query(queries.updatePerformer, [
                performertype_id,
                name,
                description,
                id,
            ]);
            return res.json(updatedPerformer.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updatePerformer = updatePerformer;
