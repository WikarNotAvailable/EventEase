"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerformersByEventId = exports.checkPerformerNameExists = exports.updatePerformer = exports.deletePerformer = exports.getPerformersByType = exports.getPerformerByName = exports.getPerformerById = exports.getPerformers = exports.addPerformer = void 0;
exports.addPerformer = "INSERT INTO performers (performertype_id, name, description, url) VALUES ($1, $2, $3, $4) RETURNING *";
exports.getPerformers = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id";
exports.getPerformerById = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE performer_id = $1";
exports.getPerformerByName = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE p.name = $1";
exports.getPerformersByType = "SELECT p.*, t.type FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE t.performertype_id = $1 LIMIT $2";
exports.deletePerformer = "DELETE FROM performers WHERE performer_id = $1";
exports.updatePerformer = "UPDATE performers SET performertype_id = $1, name = $2, description = $3, url = $4 WHERE performer_id = $5 RETURNING *";
exports.checkPerformerNameExists = "SELECT * FROM performers WHERE name = $1";
exports.getPerformersByEventId = `
  SELECT p.*, t.type
  FROM performers AS p
  JOIN eventsperformers AS ep ON p.performer_id = ep.performer_id
  JOIN events AS e ON ep.event_id = e.event_id
  JOIN performertypes AS t ON p.performertype_id = t.performertype_id
  WHERE e.event_id = $1;
`;
