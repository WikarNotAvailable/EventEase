export const addUserType = "INSERT INTO usertypes (name) VALUES ($1) RETURNING *";
export const getUserTypes = "SELECT * FROM USERTYPES";
export const getUserTypeById = "SELECT * FROM usertypes WHERE usertype_id = $1";
export const deleteUserTypeById = "DELETE FROM usertypes WHERE usertype_id = $1";
export const updateUserType = "Update usertypes SET name = $1 WHERE usertype_id = $2 RETURNING *";
