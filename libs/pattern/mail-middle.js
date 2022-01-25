module.exports = (config) => {
  const nodemailer = require("nodemailer");

  let app_name = config.app_name;
  let base_url = config.base_url;
  let smtp_user = config.smtp_user;

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
      from: `"Система контроля доступа" <${smtp_user}>`,
      to: email,
      subject: `${app_name}: подтверждение электронной почты [${token}]`,
      html:
        `Система контроля доступа <b>${app_name}</b> привествует Вас!<br>` +
        `<b>Для подтверждения почтового ящика перейдите по ссылке:</b>` +
        ` <a href="http://${base_url}/confirm/${token}">подтвердить</a>`,
    });
  };

  return function (req, res, next) {
    req.sendMail = { confirm };
    next();
  };
};
