"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDiscussionExists = exports.checkUserExists = exports.updateComment = exports.deleteComment = exports.getCommentByDiscussion = exports.getCommentByUser = exports.getCommentById = exports.getComment = exports.addComment = void 0;
exports.addComment = "INSERT INTO comments (content, post_date, user_id, discussion_id) VALUES ($1,$2,$3,$4) RETURNING *";
exports.getComment = "SELECT * FROM comments ORDER BY comments.post_date";
exports.getCommentById = "SELECT comments.comments_id, comments.content, comments.post_date, json_build_object('user_id', users.user_id, 'name', users.name, users.surname, users.email) AS user, json_build_object('discussion_id', discussions.discussion_id, 'discussionname', discussions.name) AS discussion FROM comments INNER JOIN users ON comments.user_id = users.user_id INNER JOIN discussions ON comments.discussion_id = discussions.discussion_id WHERE comments_id = $1 ORDER BY comments.post_date";
exports.getCommentByUser = "SELECT comments.comments_id, comments.content, comments.post_date, json_build_object('user_id', users.user_id, 'name', users.name, users.surname, users.email) AS user, json_build_object('discussion_id', discussions.discussion_id, 'discussionname', discussions.name) AS discussion FROM comments INNER JOIN users ON comments.user_id = users.user_id INNER JOIN discussions ON comments.discussion_id = discussions.discussion_id WHERE users.user_id = $1 ORDER BY comments.post_date";
exports.getCommentByDiscussion = "SELECT comments.comments_id, comments.content, comments.post_date, json_build_object('user_id', users.user_id, 'name', users.name, users.surname, users.email) AS user, json_build_object('discussion_id', discussions.discussion_id, 'discussionname', discussions.name) AS discussion FROM comments INNER JOIN users ON comments.user_id = users.user_id INNER JOIN discussions ON comments.discussion_id = discussions.discussion_id WHERE discussions.discussion_id = $1 ORDER BY comments.post_date";
exports.deleteComment = "DELETE FROM comments WHERE comments_id = $1";
exports.updateComment = "UPDATE comments SET content = $1, post_date = $2, user_id = $3, discussion_id = $4 WHERE comments_id = $5 RETURNING *";
exports.checkUserExists = "SELECT * FROM users WHERE user_id = $1";
exports.checkDiscussionExists = "SELECT * FROM discussions WHERE discussion_id = $1";