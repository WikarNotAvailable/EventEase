export const addCompany = "INSERT INTO company (discussion_id,name,description) VALUES ($1,$2,$3) RETURNING *";
export const getCompany = "SELECT * FROM company";
export const getCompanyById = "SELECT * FROM company WHERE company_id = $1";
export const deleteCompany = "DELETE FROM company WHERE company_id = $1";
export const updateCompany = "UPDATE company SET name = $1,description = $2 WHERE company_id = $3 RETURNING *";
