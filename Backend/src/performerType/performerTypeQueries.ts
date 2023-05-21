export const addPerformerType = "INSERT INTO performertypes (type) VALUES ($1) RETURNING *";
export const getPerformerTypes = "SELECT * FROM performertypes";
export const getPerformerTypeById = "Select * FROM performertypes WHERE performertype_id = $1";
export const deletePerformerType = "Delete FROM performertypes WHERE performertype_id = $1";
export const updatePerformerType = "Update performertypes SET type = $1 WHERE performertype_id = $2 RETURNING *";
