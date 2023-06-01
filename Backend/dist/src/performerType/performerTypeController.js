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
exports.updatePerformerType = exports.deletePerformerType = exports.getPerformerTypeById = exports.getPerformerTypes = exports.postPerformerType = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./performerTypeQueries"));
const postPerformerType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { performerTypeName } = req.body;
        const newPerformerType = yield db_1.default.query(queries.addPerformerType, [performerTypeName]);
        res.json(newPerformerType.rows[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.postPerformerType = postPerformerType;
const getPerformerTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getPerformerTypes, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPerformerTypes = getPerformerTypes;
const getPerformerTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getPerformerTypeById, [id], (error, results) => {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Performer Type does not exist. (Non existent id)" });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPerformerTypeById = getPerformerTypeById;
const deletePerformerType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const performerType = yield db_1.default.query(queries.getPerformerTypeById, [id]);
        if (!performerType.rows.length) {
            res.status(400).json({ message: "Performer Type does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deletePerformerType, [id], (error, results) => {
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
exports.deletePerformerType = deletePerformerType;
const updatePerformerType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { performerTypeName } = req.body;
        const user = yield db_1.default.query(queries.getPerformerTypeById, [id]);
        if (!user.rows.length) {
            res.status(400).json({ message: "Performer Type does not exist. (Non existent id)" });
        }
        else {
            const newPerformerType = yield db_1.default.query(queries.updatePerformerType, [performerTypeName, id]);
            res.json(newPerformerType.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updatePerformerType = updatePerformerType;
