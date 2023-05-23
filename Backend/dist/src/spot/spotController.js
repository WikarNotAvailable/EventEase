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
exports.updateSpot = exports.deleteSpot = exports.getSpotByType = exports.getSpotById = exports.getSpot = exports.postSpot = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./spotQueries"));
const postSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { spottype_id, address_id, name, description, capacity, isopen, spotimage } = req.body;
        const addressInDatabase = yield db_1.default.query(queries.checkAddressExist, [address_id]);
        const typeInDatabase = yield db_1.default.query(queries.checkSpotTypeExist, [spottype_id]);
        const spotNameExist = yield db_1.default.query(queries.checkSpotNameExist, [name]);
        if (addressInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Address does not exist." });
        }
        else if (typeInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Spot type does not exist." });
        }
        else if (spotNameExist.rows.length) {
            return res.status(400).json({ message: "Spot name already exist" });
        }
        else {
            const newSpot = yield db_1.default.query(queries.addSpot, [spottype_id, address_id, name, description, capacity, isopen, spotimage]);
            return res.status(201).json(newSpot.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postSpot = postSpot;
const getSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getSpot, (error, results) => {
            if (error)
                throw error;
            res.status(201).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getSpot = getSpot;
const getSpotById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getSpotById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows);
            }
            else {
                res.status(400).json({ message: "Spot does not exist" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getSpotById = getSpotById;
const getSpotByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spottype_id = parseInt(req.params.id);
        const spot = yield db_1.default.query(queries.getSpotByType, [spottype_id]);
        return res.status(200).json(spot.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getSpotByType = getSpotByType;
const deleteSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const spot = yield db_1.default.query(queries.getSpotById, [id]);
        if (!spot.rows.length) {
            res.status(400).json({ message: "Spot does not exist." });
        }
        else {
            db_1.default.query(queries.deleteSpot, [id], (error, results) => {
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
exports.deleteSpot = deleteSpot;
const updateSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { spottype_id, address_id, name, description, capacity, isopen, spotimage } = req.body;
        const spot = yield db_1.default.query(queries.getSpotById, [id]);
        if (!spot.rows.length) {
            return res.status(400).json({ message: "Spot does not exist" });
        }
        else {
            const newSpot = yield db_1.default.query(queries.updateSpot, [spottype_id, address_id, name, description, capacity, isopen, spotimage, id]);
            res.json(newSpot.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateSpot = updateSpot;
