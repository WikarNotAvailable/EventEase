"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPerformerNameExists = exports.updatePerformer = exports.deletePerformer = exports.getPerformerById = exports.getPerformers = exports.addPerformer = void 0;
exports.addPerformer = "INSERT INTO performers (performertype_id, name, description) VALUES ($1, $2, $3) RETURNING *";
exports.getPerformers = "SELECT * FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id";
exports.getPerformerById = "SELECT * FROM performers AS p JOIN performertypes AS t ON p.performertype_id = t.performertype_id WHERE performer_id = $1";
exports.deletePerformer = "DELETE FROM performers WHERE performer_id = $1";
exports.updatePerformer = "UPDATE performers SET performertype_id = $1, name = $2, description = $3 WHERE performer_id = $4 RETURNING *";
exports.checkPerformerNameExists = "SELECT * FROM performers WHERE name = $1";
