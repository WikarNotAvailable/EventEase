export const addCompany = "INSERT INTO companies (name, description, discussion_id) VALUES ($1,$2,$3) RETURNING *";
export const getCompany = "SELECT * FROM companies";
export const getCompanyById = "SELECT companies.company_id, companies.name, companies.description, json_build_object('discussion_id', discussions.discussion_id, 'name', discussions.name, 'description', discussions.description) AS discussion FROM companies INNER JOIN discussions ON companies.discussion_id = discussions.discussion_id WHERE companies.company_id = $1";
export const getCompanyByDiscussion = "SELECT companies.company_id, companies.name, companies.description, json_build_object('discussion_id', discussions.discussion_id, 'name', discussions.name, 'description', discussions.description) AS discussion FROM companies INNER JOIN discussions ON companies.discussion_id = discussions.discussion_id WHERE discussions.discussion_id = $1"; 
export const checkDiscussionExists ="SELECT * FROM discussions WHERE discussion_id = $1";
export const deleteCompany = "DELETE FROM companies WHERE company_id = $1";
export const updateCompany = "UPDATE companies SET name = $1,description = $2, discussion_id = $3 WHERE company_id = $4 RETURNING *";
