export const addEventPerformer = "INSERT INTO eventsperformers (event_id, performer_id) VALUES ($1, $2) RETURNING *";
export const getEventsPerformers = "SELECT * FROM eventsperformers";
export const getEventPerformerById= "SELECT * FROM eventsperformers WHERE event_id = $1 AND performer_id = $2";
export const deleteEventPerformer = "DELETE FROM eventsperformers WHERE event_id = $1 AND performer_id = $2";
export const updateEventPerformer = "UPDATE eventsperformers SET event_id = $1, performer_id = $2 WHERE event_id = $3 AND performer_id = $4 RETURNING *";
