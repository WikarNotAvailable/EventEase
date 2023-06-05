"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
