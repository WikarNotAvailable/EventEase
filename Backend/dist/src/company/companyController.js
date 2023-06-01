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
exports.updateCompany = exports.deleteCompany = exports.getCompanyById = exports.getCompany = exports.postCompany = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./companyQueries"));
const postCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { discussionID, name, description } = req.body;
        const newCompany = yield db_1.default.query(queries.addCompany, [discussionID, name, description]);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postCompany = postCompany;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getCompany, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getCompany = getCompany;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getCompanyById, [id], (error, results) => {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Company does not exist. Non existent id." });
            }
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getCompanyById = getCompanyById;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const company = yield db_1.default.query(queries.getCompanyById, [id]);
        if (!company.rows.length) {
            res.status(400).json({ message: "Company does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteCompany, [id], (error, results) => {
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
exports.deleteCompany = deleteCompany;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { name, description } = req.body;
        const company = yield db_1.default.query(queries.getCompanyById, [id]);
        if (name == null)
            name = company.rows[0]["name"];
        if (description == null)
            description = company.rows[0]["description"];
        if (!company.rows.length) {
            res.status(400).json({ message: "Company does not exist. (Non existent id)" });
        }
        else {
            const newCompany = yield db_1.default.query(queries.updateCompany, [name, description, id]);
            res.json(newCompany.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateCompany = updateCompany;
