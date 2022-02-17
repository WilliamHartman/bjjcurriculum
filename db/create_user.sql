insert into users(username, email, created_on, last_login, admin_status)
values ($1, $2, $3, $4, $5)
returning *