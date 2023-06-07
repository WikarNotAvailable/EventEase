export const getDiscussion = "SELECT * FROM discussions";
export const getDiscussionById = "SELECT discussions.discussion_id, discussions.company_id, discussions.event_id, (SELECT COALESCE(json_agg(json_build_object('comment_id', comments.comments_id, 'content', comments.content, 'post_date', comments.post_date, 'user_id', comments.user_id)), '[]'::json) FROM comments WHERE comments.discussion_id = discussions.discussion_id) AS comment FROM discussions WHERE discussions.discussion_id = $1";