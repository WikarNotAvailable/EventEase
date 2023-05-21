export const addEventImage = "INSERT INTO eventImages (url, event_id) VALUES ($1, $2) RETURNING eventImage_id";
export const getEventImages = "SELECT eventImage_id, url, event_id FROM eventImages";
export const getEventImagesByEventId = "SELECT eventImage_id, url FROM eventImages WHERE event_id = $1";
export const updateEventImage = "UPDATE eventImages SET url = $1 WHERE eventImage_id = $2";
export const deleteEventImage = "DELETE FROM eventImages WHERE eventImage_id = $1";

