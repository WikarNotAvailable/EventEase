"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerformerType = exports.deletePerformerType = exports.getPerformerTypeById = exports.getPerformerTypes = exports.addPerformerType = void 0;
exports.addPerformerType = "INSERT INTO performertypes (type) VALUES ($1) RETURNING *";
exports.getPerformerTypes = "SELECT * FROM performertypes";
exports.getPerformerTypeById = "Select * FROM performertypes WHERE performertype_id = $1";
exports.deletePerformerType = "Delete FROM performertypes WHERE performertype_id = $1";
exports.updatePerformerType = "Update performertypes SET type = $1 WHERE performertype_id = $2 RETURNING *";
