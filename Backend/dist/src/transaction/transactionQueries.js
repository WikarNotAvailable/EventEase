<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketsForTransaction = exports.getUserForTransaction = exports.updateTransaction = exports.deleteTransaction = exports.getTransactionById = exports.getTransactions = exports.checkUserExists = exports.checkTransactionStatusExists = exports.addTransaction = void 0;
exports.addTransaction = "INSERT INTO transactions (user_id, transactionstatus_id, value, transactiondate) VALUES ($1,$2,$3,$4) RETURNING *";
exports.checkTransactionStatusExists = "SELECT * FROM transactionstatuses WHERE transactionstatus_id = $1";
exports.checkUserExists = "SELECT * FROM users WHERE user_id = $1";
exports.getTransactions = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactions.transactionstatus_id = transactionstatuses.transactionstatus_id";
exports.getTransactionById = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactions.transactionstatus_id = transactionstatuses.transactionstatus_id WHERE transaction_id = $1 ";
exports.deleteTransaction = "DELETE FROM transactions WHERE transaction_id = $1";
exports.updateTransaction = "UPDATE transactions SET transactionstatus_id = $1, value = $2, transactiondate = $3 WHERE transaction_id = $4 RETURNING *";
exports.getUserForTransaction = "SELECT usertypes.name as usertype, users.name, users.surname, users.email, users.phone_number, users.birthday FROM users INNER JOIN usertypes on users.usertype_id = usertypes.usertype_id WHERE user_id = $1";
exports.getTicketsForTransaction = "SELECT * FROM tickets INNER JOIN tickettypes on tickettypes.tickettype_id = tickets.tickettype_id WHERE tickets.transaction_id = $1";
=======
>>>>>>> e1410fad82aefd898704b932ecccc0efc7a476b0
