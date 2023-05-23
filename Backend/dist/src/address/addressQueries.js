"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddress = exports.deleteAddress = exports.getAddressById = exports.getAddress = exports.addAddress = void 0;
exports.addAddress = "INSERT INTO addresses (country, city, street, number) VALUES ($1,$2,$3,$4) RETURNING *";
exports.getAddress = "SELECT * FROM addresses";
exports.getAddressById = "SELECT * FROM addresses WHERE address_id = $1";
exports.deleteAddress = "DELETE FROM addresses WHERE address_id = $1";
exports.updateAddress = "UPDATE addresses SET country = $1, city = $2, street = $3, number = $4 WHERE address_id = $5 RETURNING *";
