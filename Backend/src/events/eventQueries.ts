export const addEvent = "INSERT INTO events (name, description, BeginDate, EndDate, AvailableTickets, CurrentlyTakenTickets, spot_id, eventtype_id, company_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
export const getEvents = "SELECT * FROM events";
export const getEventById = "SELECT * FROM events WHERE event_id = $1";
export const deleteEvent = "DELETE FROM events WHERE event_id = $1";
export const updateEvent = "UPDATE events SET name = $1, description = $2, BeginDate = $3, EndDate = $4, AvailableTickets = $5, CurrentlyTakenTickets = $6, spot_id = $7, eventtype_id = $8, company_id = $9, discussion_id = $10 WHERE event_id = $11 RETURNING *";
export const getEventsBySpotId = "SELECT * FROM events WHERE spot_id = $1";
export const getEventsByEventTypeId = "SELECT * FROM events WHERE eventtype_id = $1";
export const getEventsByCompanyId = "SELECT * FROM events WHERE company_id = $1";
export const getEventsWithinDateRange = "SELECT * FROM events WHERE BeginDate >= $1 AND EndDate <= $2";
export const getEventsWithAvailableTickets = "SELECT * FROM events WHERE AvailableTickets > 0";
export const getEventsWithLimitedAvailability = "SELECT * FROM events WHERE AvailableTickets <= $1";
export const getEventsWithSoldOutTickets = "SELECT * FROM events WHERE AvailableTickets = 0";

/*
Request Body for addEvent:
{
    "name": string,
    "description": string,
    "BeginDate": date,
    "EndDate": date,
    "AvailableTickets": integer,
    "CurrentlyTakenTickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}

Request Body for updateEvent:
{
    "name": string,
    "description": string,
    "BeginDate": date,
    "EndDate": date,
    "AvailableTickets": integer,
    "CurrentlyTakenTickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}
*/