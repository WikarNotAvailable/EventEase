export const addCompany = "INSERT INTO companies (name, description) VALUES ($1,$2) RETURNING *";
export const getCompany = "SELECT * FROM companies";
export const getCompanyById = "SELECT companies.company_id, companies.name, companies.description, json_build_object('discussion_id', discussions.discussion_id, 'comments', json_build_object('comments_id', comments.comments_id,'content',comments.content)) AS discussion FROM companies LEFT JOIN discussions ON companies.discussion_id = discussions.discussion_id LEFT JOIN comments ON discussions.discussion_id = comments.discussion_id WHERE companies.company_id = $1";
export const checkDiscussionExists ="SELECT * FROM discussions WHERE discussion_id = $1";
export const deleteCompany = "DELETE FROM companies WHERE company_id = $1";
export const updateCompany = "UPDATE companies SET name = $1,description = $2 WHERE company_id = $3 RETURNING *";
