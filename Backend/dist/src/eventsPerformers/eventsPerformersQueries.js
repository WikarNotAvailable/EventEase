"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventPerformer = exports.deleteEventPerformer = exports.getEventPerformerById = exports.getEventsPerformers = exports.addEventPerformer = void 0;
exports.addEventPerformer = "INSERT INTO eventsperformers (event_id, performer_id) VALUES ($1, $2) RETURNING *";
exports.getEventsPerformers = "SELECT * FROM eventsperformers";
exports.getEventPerformerById = "SELECT * FROM eventsperformers WHERE event_id = $1 AND performer_id = $2";
exports.deleteEventPerformer = "DELETE FROM eventsperformers WHERE event_id = $1 AND performer_id = $2";
exports.updateEventPerformer = "UPDATE eventsperformers SET event_id = $1, performer_id = $2 WHERE event_id = $3 AND performer_id = $4 RETURNING *";
