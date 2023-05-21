export const addEventType = "INSERT INTO eventtypes (name) VALUES ($1) RETURNING *";
export const getEventType = "SELECT * FROM eventtypes";
export const getEventTypeById = "SELECT * FROM eventtypes WHERE eventtype_id = ($1)";
export const deleteEventType = "DELETE FROM eventtypes WHERE eventtype_id = ($1)";
export const updateEventType = "UPDATE eventtypes SET name = $1 WHERE eventtype_id = $2 RETURNING *";