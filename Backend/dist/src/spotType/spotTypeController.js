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
exports.updateSpotType = exports.deleteSpotType = exports.getSpotTypeById = exports.getSpotType = exports.postSpotType = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./spotTypeQueries"));
const postSpotType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { spotTypeName } = req.body;
        const newSpotType = yield db_1.default.query(queries.addSpotType, [spotTypeName]);
        res.json(newSpotType.rows);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
exports.postSpotType = postSpotType;
const getSpotType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getSpotType, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getSpotType = getSpotType;
const getSpotTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getSpotTypeById, [id], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length) {
                res.status(200).json(result.rows);
            }
            else {
                res.status(400).json({ message: "Spot Type does not exist. (Non existent id)" });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getSpotTypeById = getSpotTypeById;
const deleteSpotType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const spotType = yield db_1.default.query(queries.getSpotTypeById, [id]);
        if (!spotType.rows.length) {
            res.status(400).json({ message: "Spot type does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteSpotType, [id], (error, result) => {
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
exports.deleteSpotType = deleteSpotType;
const updateSpotType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { spotTypeName } = req.body;
        const spotType = yield db_1.default.query(queries.getSpotTypeById, [id]);
        if (!spotType.rows.length) {
            res.status(400).json({ message: " Spot type does not exist. (Non existent id)" });
        }
        else {
            const newSpotType = yield db_1.default.query(queries.updateSpotType, [spotTypeName, id]);
            res.json(newSpotType.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateSpotType = updateSpotType;
