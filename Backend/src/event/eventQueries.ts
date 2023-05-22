export const addEvent = "INSERT INTO events (name, description, BeginDate, EndDate, AvailableTickets, CurrentlyTakenTickets, spot_id, eventtype_id, company_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
export const getEvents = "SELECT * FROM events";
export const getEventById = `SELECT
    e.event_id,
    e.name,
    e.description,
    e.beginDate,
    e.endDate,
    e.availableTickets,
    e.currentlyTakenTickets,
    json_build_object(
      'spot_id', s.spot_id,
      'spot_name', s.name,
      'spot_type', st.name,
      'address', json_build_object(
        'address_id', a.address_id,
        'country', a.country,
        'city', a.city,
        'street', a.street,
        'number', a.number
      )
    ) AS spot,
    et.name AS eventtype_name,
    e.company_id,
    e.discussion_id,
    json_agg(json_build_object(
      'eventimage_id', ei.eventimage_id,
      'image_url', ei.url
    )) AS event_images
  FROM events AS e
  JOIN spots AS s ON e.spot_id = s.spot_id
  JOIN spottypes AS st ON s.spottype_id = st.spottype_id
  JOIN addresses AS a ON s.address_id = a.address_id
  JOIN eventtypes AS et ON e.eventtype_id = et.eventtype_id
  JOIN eventimages AS ei ON ei.event_id = e.event_id
  WHERE e.event_id = $1
  GROUP BY e.event_id, s.spot_id, s.name, st.name, a.address_id, et.name
`;

export const deleteEvent = "DELETE FROM events WHERE event_id = $1";
export const updateEvent = "UPDATE events SET name = $1, description = $2, BeginDate = $3, EndDate = $4, AvailableTickets = $5, CurrentlyTakenTickets = $6, spot_id = $7, eventtype_id = $8, company_id = $9, discussion_id = $10 WHERE event_id = $11 RETURNING *";
export const getEventsBySpotId = "SELECT * FROM events WHERE spot_id = $1";
export const getEventsByEventTypeId = "SELECT * FROM events WHERE eventtype_id = $1";
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