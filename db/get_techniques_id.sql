select * from users
join techniques on techniques.user_id = users.user_id
where users.user_id = $1