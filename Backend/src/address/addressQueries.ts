export const addAddress = "INSERT INTO addresses (country, city, street, number) VALUES ($1,$2,$3,$4) RETURNING *";
export const getAddress = "SELECT * FROM addresses";
export const getAddressById = "SELECT * FROM addresses WHERE address_id = $1";
export const deleteAddress = "DELETE FROM addresses WHERE address_id = $1";
export const updateAddress = "UPDATE addresses SET country = $1, city = $2, street = $3, number = $4 WHERE address_id = $5 RETURNING *";
