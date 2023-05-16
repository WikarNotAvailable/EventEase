export const addPerformerType = "INSERT INTO performertypes (name) VALUES ($1) RETURNING *";
export const getPerformerTypes = "SELECT * FROM performertypes";
export const getPerformerTypeById = "Select * FROM performertypes WHERE performertype_id = $1";