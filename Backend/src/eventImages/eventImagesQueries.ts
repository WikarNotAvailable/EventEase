export const addEventImage = "INSERT INTO eventImages (url, event_id) VALUES ($1, $2) RETURNING *";
export const getEventImages = "SELECT * FROM eventImages";
export const getEventImageById = "SELECT * FROM eventImages WHERE eventimage_id = $1";
export const getEventImagesByEventId = "SELECT * FROM eventImages WHERE event_id = $1";
export const updateEventImage = "UPDATE eventImages SET url = $1, event_id = $2 WHERE eventimage_id = $3 RETURNING *";
export const deleteEventImage = "DELETE FROM eventImages WHERE eventimage_id = $1";

