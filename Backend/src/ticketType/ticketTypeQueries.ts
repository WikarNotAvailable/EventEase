export const addTicketType = "INSERT INTO tickettypes (type) VALUES ($1) RETURNING *";
export const getTicketTypes = "SELECT * FROM tickettypes";
export const getTicketTypeById = "SELECT * FROM tickettypes WHERE tickettype_id = $1";
export const deleteTicketTypeById = "DELETE FROM tickettypes WHERE tickettype_id = $1";
export const updateTicketType = "UPDATE tickettypes SET type = $1 WHERE tickettype_id = $2 RETURNING *";
export const getTicketTypeByType = "SELECT * FROM tickettypes WHERE type = $1";