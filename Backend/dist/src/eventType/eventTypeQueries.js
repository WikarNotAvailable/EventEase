"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventType = exports.deleteEventType = exports.getEventTypeById = exports.getEventType = exports.addEventType = void 0;
exports.addEventType = "INSERT INTO eventtypes (name) VALUES ($1) RETURNING *";
exports.getEventType = "SELECT * FROM eventtypes";
exports.getEventTypeById = "SELECT * FROM eventtypes WHERE eventtype_id = ($1)";
exports.deleteEventType = "DELETE FROM eventtypes WHERE eventtype_id = ($1)";
exports.updateEventType = "UPDATE eventtypes SET name = $1 WHERE eventtype_id = $2 RETURNING *";
