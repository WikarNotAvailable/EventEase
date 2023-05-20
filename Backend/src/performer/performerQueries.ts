export const addPerformer = "INSERT INTO performers (performertype_id, name, description) VALUES ($1, $2, $3) RETURNING *";
export const getPerformers = "SELECT * FROM performers";
export const getPerformerById = "SELECT * FROM performers WHERE performer_id = $1";
export const deletePerformer = "DELETE FROM performers WHERE performer_id = $1";
export const updatePerformer = "UPDATE performers SET performertype_id = $1, name = $2, description = $3 WHERE performer_id = $4 RETURNING *";
export const checkPerformerNameExists = "SELECT * FROM performers WHERE name = $1";
