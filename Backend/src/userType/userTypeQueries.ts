export const addUserType = "INSERT INTO usertypes (name) VALUES ($1) RETURNING *";
export const getUserTypes = "SELECT * FROM USERTYPES";
export const getUserTypeById = "SELECT * FROM usertypes WHERE usertype_id = $1";
