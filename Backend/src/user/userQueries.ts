export const addUser = "INSERT INTO users (usertype_id,name,surname,email,phone_number,birthday,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
export const checkUserTypeExists = "SELECT * from usertypes WHERE usertype_id = $1";
export const checkEmailExists = "SELECT * from users WHERE email = $1";
export const checkPhoneNumberExists = "SELECT * from users WHERE phone_number = $1";
export const getUsers = "Select * FROM users";
export const getUserById = "Select * FROM users WHERE user_id = $1";
export const deleteUser = "Delete FROM users WHERE user_id = $1";
export const updateUser = "Update users SET name = $1, surname = $2, email = $3, phone_number = $4, birthday = $5, password = $6 WHERE user_id = $7 RETURNING *"