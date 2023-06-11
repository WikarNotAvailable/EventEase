export const addSpotType = "INSERT INTO spottypes (name) VALUES ($1) RETURNING *";
export const getSpotType = "SELECT * FROM spottypes"
export const getSpotTypeById = "SELECT * FROM spottypes WHERE spottype_id = $1";
export const deleteSpotType = "DELETE FROM  spottypes WHERE spottype_id = $1";
export const updateSpotType = "UPDATE spottypes SET name = $1 WHERE spottype_id = $2 RETURNING *";
export const checkSpotTypeNameExist = " SELECT * FROM spottypes WHERE name = $1";

