export const addUser = "INSERT INTO users (usertype_id,name,surname,email,phone_number,birthday,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
export const checkUserTypeExists = "SELECT * from usertypes WHERE usertype_id = $1";
export const checkEmailExists = "SELECT * from users WHERE email = $1";
export const checkPhoneNumberExists = "SELECT * from users WHERE phone_number = $1";
export const getUsers = "Select user_id, users.usertype_id, usertypes.name as usertype, users.name, surname, email, phone_number, birthday FROM users INNER JOIN usertypes on users.usertype_id = usertypes.usertype_id";
export const getUserById = "Select user_id, users.usertype_id, usertypes.name as usertype, users.name, surname, email, phone_number, birthday, password FROM users INNER JOIN usertypes on users.usertype_id = usertypes.usertype_id WHERE user_id = $1";
export const deleteUser = "Delete FROM users WHERE user_id = $1";
export const updateUser = "Update users SET name = $1, surname = $2, email = $3, phone_number = $4, birthday = $5, password = $6 WHERE user_id = $7 RETURNING *";
export const loginUser = "SELECT * from users WHERE email = $1 and password = $2";
export const getTransactionsForUser = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactions.transactionstatus_id = transactionstatuses.transactionstatus_id WHERE transactions.user_id = $1"