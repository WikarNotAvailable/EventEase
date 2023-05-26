export const addPerformer = "INSERT INTO performers (performertype_id, name, description, url) VALUES ($1, $2, $3, $4) RETURNING *";
export const getPerformers = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id";
export const getPerformerById = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE performer_id = $1";
export const getPerformersByType = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE t.performertype_id = $1";
export const getPerformersByTypeWithLimit = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE t.performertype_id = $1 LIMIT $2";
export const deletePerformer = "DELETE FROM performers WHERE performer_id = $1";
export const updatePerformer = "UPDATE performers SET performertype_id = $1, name = $2, description = $3, url = $4 WHERE performer_id = $5 RETURNING *";
export const checkPerformerNameExists = "SELECT * FROM performers WHERE name = $1";
