const config = {
  DISABLE_NODE_TLS_REJECT_UNAUTHORIZED: true,
  app_name: "Pattern",
  local_port: "3000",
  base_url: "http://127.0.0.1:3000/",
  db_host: "apv.yelka.ru",
  db_user: "apvuser",
  db_password: "",
  db_name: "apv",
  db_prefix: "pattern",
  default_user_role: "default",
  smtp_user: "",
  smtp_pass: "",
  smtp_server: "smtp.go2.unisender.ru",
  smtp_mailer_address: "no-reply@yelka.ru",
  front_end_url: "http://127.0.0.1:8080/",
  api_url: "api/",
  build: "DEV",
  botToken: ":",
  errorNormal: 255,
  deviceNormal: 255,
};

module.exports = config;
