export const addTransactionStatus = "INSERT INTO transactionstatuses (status) VALUES ($1) RETURNING *";
export const getTransactionStatuses = "SELECT * FROM transactionstatuses";
export const getTransactionStatusById = "SELECT * FROM transactionstatuses WHERE transactionstatus_id = $1";
export const deleteTransactionStatus = "DELETE FROM transactionstatuses WHERE transactionstatus_id = $1";
export const updateTransactionStatus = "UPDATE transactionstatuses SET status = $1 WHERE transactionstatus_id = $2 RETURNING *";