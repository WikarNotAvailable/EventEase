"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionStatus = exports.deleteTransactionStatus = exports.getTransactionStatusById = exports.getTransactionStatuses = exports.addTransactionStatus = void 0;
exports.addTransactionStatus = "INSERT INTO transactionstatuses (status) VALUES ($1) RETURNING *";
exports.getTransactionStatuses = "SELECT * FROM transactionstatuses";
exports.getTransactionStatusById = "SELECT * FROM transactionstatuses WHERE transactionstatus_id = $1";
exports.deleteTransactionStatus = "DELETE FROM transactionstatuses WHERE transactionstatus_id = $1";
exports.updateTransactionStatus = "UPDATE transactionstatuses SET status = $1 WHERE transactionstatus_id = $2 RETURNING *";
