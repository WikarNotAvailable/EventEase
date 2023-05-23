export const addComment = "INSERT INTO comments (content, post_date, user_id, discussion_id) VALUES $1,$2,$3,$4 RETURNING *";
export const getComment = "SELECT * FROM comments";
export const getCommentById = "SELECT * FROM comments WHERE comment_id = $1";
export const getCommentByUser = "SELECT * FROM comments WHERE user_id =$1";
export const checkUserExists
export const checkDiscussionExists