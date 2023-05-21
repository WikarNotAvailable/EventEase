"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSpotType = exports.deleteSpotType = exports.getSpotTypeById = exports.getSpotType = exports.addSpotType = void 0;
exports.addSpotType = "INSERT INTO spottypes (name) VALUES ($1) RETURNING *";
exports.getSpotType = "SELECT * FROM spottypes";
exports.getSpotTypeById = "SELECT * FROM spottypes WHERE spottype_id = $1";
exports.deleteSpotType = "DELETE FROM  spottypes WHERE spottype_id = $1";
exports.updateSpotType = "UPDATE spottypes SET name = $1 WHERE spottype_id = $2 RETURNING *";
