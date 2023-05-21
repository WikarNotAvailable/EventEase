export const addCompany = "INSERT INTO companies (discussion_id,name,description) VALUES ($1,$2,$3) RETURNING *";
export const getCompany = "SELECT * FROM companies";
export const getCompanyById = "SELECT * FROM companies WHERE company_id = $1";
export const deleteCompany = "DELETE FROM companies WHERE company_id = $1";
export const updateCompany = "UPDATE companies SET name = $1,description = $2 WHERE company_id = $3 RETURNING *";
