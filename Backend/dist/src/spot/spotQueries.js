"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressForSpot = exports.updateSpot = exports.deleteSpot = exports.getSpotByType = exports.getSpotByName = exports.getSpotById = exports.getSpot = exports.checkSpotNameExist = exports.checkSpotTypeExist = exports.checkAddressExist = exports.addSpot = void 0;
exports.addSpot = "INSERT INTO spots (spottype_id, address_id, name, description, capacity, isopen, spotimage) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
exports.checkAddressExist = "SELECT * FROM addresses WHERE address_id = $1";
exports.checkSpotTypeExist = "SELECT * FROM spottypes WHERE spottype_id = $1";
exports.checkSpotNameExist = " SELECT * FROM spots WHERE name = $1";
exports.getSpot = "SELECT * FROM spots";
exports.getSpotById = "SELECT spots.spot_id, json_build_object('address_id', addresses.address_id, 'country', addresses.country, 'city', addresses.city, 'street', addresses.street, 'number', addresses.number) AS address, spots.spottype_id, spots.name, spots.description, spots.capacity, spots.isopen, spots.spotimage, spottypes.name AS type FROM spots INNER JOIN addresses ON spots.address_id = addresses.address_id INNER JOIN spottypes ON spots.spottype_id = spottypes.spottype_id WHERE spot_id = $1";
exports.getSpotByName = "SELECT spots.spot_id, json_build_object('address_id', addresses.address_id, 'country', addresses.country, 'city', addresses.city, 'street', addresses.street, 'number', addresses.number) AS address, spots.spottype_id, spots.name, spots.description, spots.capacity, spots.isopen, spots.spotimage, spottypes.name AS type FROM spots INNER JOIN addresses ON spots.address_id = addresses.address_id INNER JOIN spottypes ON spots.spottype_id = spottypes.spottype_id WHERE spots.name = $1";
exports.getSpotByType = "SELECT spots.spot_id, json_build_object('address_id', addresses.address_id, 'country', addresses.country, 'city', addresses.city, 'street', addresses.street, 'number', addresses.number) AS address, spots.spottype_id, spots.name, spots.description, spots.capacity, spots.isopen, spots.spotimage, spottypes.name AS type FROM spots INNER JOIN addresses ON spots.address_id = addresses.address_id INNER JOIN spottypes ON spots.spottype_id = spottypes.spottype_id WHERE spottypes.spottype_id = $1";
exports.deleteSpot = "DELETE FROM spots WHERE spot_id = $1";
exports.updateSpot = "UPDATE spots SET spottype_id = $1, address_id = $2, name = $3, description = $4, capacity = $5, isopen = $6, spotimage = $7 WHERE spot_id = $8 RETURNING *";
exports.getAddressForSpot = "SELECT * FROM addresses WHERE address_id = $1";
