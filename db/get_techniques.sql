select * from users
join techniques on techniques.user_id = users.user_id
where email = $1