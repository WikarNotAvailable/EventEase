export const addEventPerformer = "INSERT INTO eventsperformers (event_id, performer_id) VALUES ($1, $2)";
export const getEventsPerformers = "SELECT * FROM eventsperformers";
export const getEventPerformerByEventId = "SELECT * FROM eventsperformers WHERE event_id = $1";
export const getEventPerformerByPerformerId = "SELECT * FROM eventsperformers WHERE performer_id = $1";
export const deleteEventPerformer = "DELETE FROM eventsperformers WHERE event_id = $1 AND performer_id = $2";
