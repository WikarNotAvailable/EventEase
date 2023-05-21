export const addTransaction = "INSERT INTO transactions (user_id, transactionstatus_id, value, transactiondate) VALUES ($1,$2,$3,$4) RETURNING *";
export const checkTransactionStatusExists = "SELECT * FROM transactionstatuses WHERE transactionstatus_id = $1";
export const checkUserExists = "SELECT * FROM users WHERE user_id = $1";
export const getTransactions = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactions.transactionstatus_id = transactionstatuses.transactionstatus_id";
export const getTransactionById = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactions.transactionstatus_id = transactionstatuses.transactionstatus_id WHERE transaction_id = $1 ";
export const deleteTransaction = "DELETE FROM transactions WHERE transaction_id = $1";
export const updateTransaction = "UPDATE transactions SET transactionstatus_id = $1, value = $2, transactiondate = $3 WHERE transaction_id = $4 RETURNING *";
export const getUserForTransaction = "SELECT usertypes.name as usertype, users.name, users.surname, users.email, users.phone_number, users.birthday FROM users INNER JOIN usertypes on users.usertype_id = usertypes.usertype_id WHERE user_id = $1";
