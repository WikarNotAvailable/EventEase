"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsByPerformerId = exports.getEventsWithSoldOutTickets = exports.getEventsWithLimitedAvailability = exports.getEventsWithAvailableTickets = exports.getEventsWithinDateRange = exports.getEventsByEventTypeId = exports.getEventsBySpotId = exports.updateEvent = exports.deleteEvent = exports.getEventById = exports.getEvents = exports.addEvent = void 0;
exports.addEvent = "INSERT INTO events (name, description, begindate, enddate, availabletickets, currentlytakentickets, spot_id, eventtype_id, company_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
exports.getEvents = `SELECT
  e.event_id,
  e.name,
  e.description,
  e.begindate,
  e.enddate,
  e.availabletickets,
  e.currentlytakentickets,
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
  (
    SELECT COALESCE(json_agg(json_build_object(
        'eventimage_id', ei.eventimage_id,
        'image_url', ei.url
      )), '[]'::json)
    FROM eventimages AS ei
    WHERE ei.event_id = e.event_id
  ) AS event_images,
  (
    SELECT COALESCE(json_agg(json_build_object(
        'performer_id', p.performer_id,
        'performer_name', p.name,
        'performer_type', pt.type
      )), '[]'::json)
    FROM eventsperformers AS ep
    JOIN performers AS p ON p.performer_id = ep.performer_id
    JOIN performertypes AS pt ON p.performertype_id = pt.performertype_id
    WHERE ep.event_id = e.event_id
  ) AS performers
  FROM events AS e
  JOIN spots AS s ON e.spot_id = s.spot_id
  JOIN spottypes AS st ON s.spottype_id = st.spottype_id
  JOIN addresses AS a ON s.address_id = a.address_id
  JOIN eventtypes AS et ON e.eventtype_id = et.eventtype_id;
  `;
exports.getEventById = `SELECT
  e.event_id,
  e.name,
  e.description,
  e.begindate,
  e.enddate,
  e.availabletickets,
  e.currentlytakentickets,
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
  (
    SELECT COALESCE(json_agg(json_build_object(
        'eventimage_id', ei.eventimage_id,
        'image_url', ei.url
      )), '[]'::json)
    FROM eventimages AS ei
    WHERE ei.event_id = e.event_id
  ) AS event_images,
  (
    SELECT COALESCE(json_agg(json_build_object(
        'performer_id', p.performer_id,
        'performer_name', p.name,
        'performer_type', pt.type
      )), '[]'::json)
    FROM eventsperformers AS ep
    JOIN performers AS p ON p.performer_id = ep.performer_id
    JOIN performertypes AS pt ON p.performertype_id = pt.performertype_id
    WHERE ep.event_id = e.event_id
  ) AS performers
  FROM events AS e
  JOIN spots AS s ON e.spot_id = s.spot_id
  JOIN spottypes AS st ON s.spottype_id = st.spottype_id
  JOIN addresses AS a ON s.address_id = a.address_id
  JOIN eventtypes AS et ON e.eventtype_id = et.eventtype_id
  WHERE e.event_id = $1;
`;
exports.deleteEvent = "DELETE FROM events WHERE event_id = $1";
exports.updateEvent = "UPDATE events SET name = $1, description = $2, begindate = $3, enddate = $4, availabletickets = $5, currentlytakentickets = $6, spot_id = $7, eventtype_id = $8, company_id = $9, discussion_id = $10 WHERE event_id = $11 RETURNING *";
exports.getEventsBySpotId = "SELECT * FROM events WHERE spot_id = $1";
exports.getEventsByEventTypeId = "SELECT * FROM events WHERE eventtype_id = $1";
exports.getEventsWithinDateRange = "SELECT * FROM events WHERE begindate >= $1 AND enddate <= $2";
exports.getEventsWithAvailableTickets = "SELECT * FROM events WHERE availabletickets > 0";
exports.getEventsWithLimitedAvailability = "SELECT * FROM events WHERE availabletickets <= $1";
exports.getEventsWithSoldOutTickets = "SELECT * FROM events WHERE availabletickets = 0";
exports.getEventsByPerformerId = `
  SELECT
    e.event_id,
    e.name,
    e.description,
    e.begindate,
    e.enddate,
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
    json_build_object(
      'performer_id', p.performer_id,
      'performer_name', p.name,
      'performer_type', pt.type
    ) AS performer
  FROM
    events AS e
    JOIN spots AS s ON e.spot_id = s.spot_id
    JOIN spottypes AS st ON s.spottype_id = st.spottype_id
    JOIN addresses AS a ON s.address_id = a.address_id
    JOIN eventsperformers AS ep ON ep.event_id = e.event_id
    JOIN performers AS p ON p.performer_id = ep.performer_id
    JOIN performertypes AS pt ON p.performertype_id = pt.performertype_id
  WHERE
    ep.performer_id = $1
`;
/*
Request Body for addEvent:
{
    "name": string,
    "description": string,
    "begindate": date,
    "enddate": date,
    "availabletickets": integer,
    "currentlytakentickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}

Request Body for updateEvent:
{
    "name": string,
    "description": string,
    "begindate": date,
    "enddate": date,
    "availabletickets": integer,
    "currentlytakentickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}
*/
