const config = {
  local_port: "3000",
  base_url: "127.0.0.1:3000",
  db_host: "SERVER",
  db_user: "USER",
  db_password: "PASSWORD",
  db_name: "DATABASE",
  redis_host: "127.0.0.1",
  redis_port: 6379,
  redis_secret: "redis_secret_key",
  redis_password: "redispassword",
  smtp_user: "no-reply@yelka.ru",
  smtp_pass: "PASSWORD",
  smtp_server: "smtp.titan.email",
  timezone_offset: 0,
  build: "DEV",
};

module.exports = config;
