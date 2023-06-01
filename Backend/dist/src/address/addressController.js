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
exports.updateAddress = exports.deleteAddress = exports.getAddressById = exports.getAddress = exports.postAddress = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./addressQueries"));
const postAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { country, city, street, number } = req.body;
        const newAddress = yield db_1.default.query(queries.addAddress, [country, city, street, number]);
        res.json(newAddress.rows[0]);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.postAddress = postAddress;
const getAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getAddress, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getAddress = getAddress;
const getAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getAddressById, [id], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length) {
                res.status(200).json(result.rows[0]);
            }
            else {
                res.status(400).json({ message: "Address does not exist." });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getAddressById = getAddressById;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const address = yield db_1.default.query(queries.getAddressById, [id]);
        if (!address.rows.length) {
            res.status(400).json({ message: "Address does not exist." });
        }
        else {
            db_1.default.query(queries.deleteAddress, [id], (error, results) => {
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
exports.deleteAddress = deleteAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { country, city, street, number } = req.body;
        const address = yield db_1.default.query(queries.getAddressById, [id]);
        if (country == null)
            country = address.rows[0]["country"];
        if (city == null)
            city = address.rows[0]["city"];
        if (street == null)
            street = address.rows[0]["street"];
        if (number == null)
            number = address.rows[0]["number"];
        if (!address.rows.length) {
            res.status(400).json({ message: "Address does not exist." });
        }
        else {
            const newAddress = yield db_1.default.query(queries.updateAddress, [country, city, street, number, id]);
            res.json(newAddress.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateAddress = updateAddress;
