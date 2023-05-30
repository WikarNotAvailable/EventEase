<<<<<<< HEAD
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
exports.updateTransaction = exports.deleteTransaction = exports.getTransactionById = exports.getTransactions = exports.postTransaction = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./transactionQueries"));
const postTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, transactionStatusID, value, transactionDate } = req.body;
        const userInDatabase = yield db_1.default.query(queries.checkUserExists, [userID]);
        const transactionStatusInDatabase = yield db_1.default.query(queries.checkTransactionStatusExists, [transactionStatusID]);
        if (userInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "User does not exist." });
        }
        else if (transactionStatusInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Transaction status does not exist." });
        }
        else {
            const newTransaction = yield db_1.default.query(queries.addTransaction, [userID, transactionStatusID, value, transactionDate]);
            return res.status(201).json(newTransaction.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postTransaction = postTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getTransactions, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTransactions = getTransactions;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getTransactionById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                results.rows[0]["user"] = (yield db_1.default.query(queries.getUserForTransaction, [results.rows[0]["user_id"]])).rows[0];
                results.rows[0]["tickets"] = (yield db_1.default.query(queries.getTicketsForTransaction, [results.rows[0]["transaction_id"]])).rows;
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTransactionById = getTransactionById;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const transaction = yield db_1.default.query(queries.getTransactionById, [id]);
        if (!transaction.rows.length) {
            res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteTransaction, [id], (error, results) => {
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
exports.deleteTransaction = deleteTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { transactionStatusID, value, transactionDate } = req.body;
        const transaction = yield db_1.default.query(queries.getTransactionById, [id]);
        if (transactionStatusID == null)
            transactionStatusID = transaction.rows[0]["transactionstatus_id"];
        if (value == null)
            value = transaction.rows[0]["value"];
        if (transactionDate == null)
            transactionDate = transaction.rows[0]["transactiondate"];
        if (!transaction.rows.length) {
            res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
        }
        else {
            const newTransaction = yield db_1.default.query(queries.updateTransaction, [transactionStatusID, value, transactionDate, id]);
            res.status(200).json(newTransaction.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateTransaction = updateTransaction;
=======
>>>>>>> e1410fad82aefd898704b932ecccc0efc7a476b0
