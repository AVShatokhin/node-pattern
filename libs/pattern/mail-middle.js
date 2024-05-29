module.exports = (config) => {
  if (config?.DISABLE_NODE_TLS_REJECT_UNAUTHORIZED == true)
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const nodemailer = require("nodemailer");

  let app_name = config.app_name;
  let base_url = config.base_url;
  let smtp_mailer_address = config.smtp_mailer_address;
  let api_url = config.api_url;
  let front_end_url = config.front_end_url;

  let transporter = nodemailer.createTransport({
    host: config.smtp_server,
    port: 465,
    secure: true,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
  });

  let confirm = async (email, token) => {
    await transporter.sendMail({
      from: `"Система контроля доступа" <${smtp_mailer_address}>`,
      to: email,
      subject: `${app_name}: подтверждение электронной почты [${token}]`,
      html:
        `Система контроля доступа <b>${app_name}</b> привествует Вас!<br>` +
        `<b>Для подтверждения почтового ящика перейдите по ссылке:</b>` +
        ` <a href="${base_url}${api_url}confirm/${token}">подтвердить</a>`,
    });
  };

  let recover = async (email, token) => {
    await transporter.sendMail({
      from: `"Система контроля доступа" <${smtp_mailer_address}>`,
      to: email,
      subject: `${app_name}: восстановление пароля [${token}]`,
      html:
        `Система контроля доступа <b>${app_name}</b> привествует Вас!<br>` +
        `<b>Для установки нового пароля перейдите по ссылке:</b>` +
        ` <a href="${front_end_url}#/new_password/${token}">установить новый пароль</a>`,
    });
  };

  return function (req, res, next) {
    req.sendMail = { confirm, recover };
    next();
  };
};
