export const addAddress = "INSERT INTO address (country, city, street, number) VALUES ($1,$2,$3,$4) RETURNING *";
export const getAddress = "SELECT * FROM address";
export const getAddressById = "SELECT * FROM address WHERE address_id = $1";
export const deleteAddress = "DELETE FROM address WHERE address_id = $1";
export const updateAddress = "UPDATE address SET country = $1, city = $2, street = $3, number = $4 WHERE address_id = $5 RETURNING *";