"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketTypeByType = exports.updateTicketType = exports.deleteTicketTypeById = exports.getTicketTypeById = exports.getTicketTypes = exports.addTicketType = void 0;
exports.addTicketType = "INSERT INTO tickettypes (type) VALUES ($1) RETURNING *";
exports.getTicketTypes = "SELECT * FROM tickettypes";
exports.getTicketTypeById = "SELECT * FROM tickettypes WHERE tickettype_id = $1";
exports.deleteTicketTypeById = "DELETE FROM tickettypes WHERE tickettype_id = $1";
exports.updateTicketType = "UPDATE tickettypes SET type = $1 WHERE tickettype_id = $2 RETURNING *";
exports.getTicketTypeByType = "SELECT * FROM tickettypes WHERE type = $1";
