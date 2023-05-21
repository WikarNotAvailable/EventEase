"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserType = exports.deleteUserTypeById = exports.getUserTypeById = exports.getUserTypes = exports.addUserType = void 0;
exports.addUserType = "INSERT INTO usertypes (name) VALUES ($1) RETURNING *";
exports.getUserTypes = "SELECT * FROM USERTYPES";
exports.getUserTypeById = "SELECT * FROM usertypes WHERE usertype_id = $1";
exports.deleteUserTypeById = "DELETE FROM usertypes WHERE usertype_id = $1";
exports.updateUserType = "Update usertypes SET name = $1 WHERE usertype_id = $2 RETURNING *";
