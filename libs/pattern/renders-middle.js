module.exports = () => {
  return (req, res, next) => {
    res.result = {
      status: "failed",
      errorCode: "",
      errorMessage: "",
    };

    res.ok = () => {
      res.result.status = "ok";
      res.json(res.result);
    };

    res.error = (type, err) => {
      switch (type) {
        case "SQL":
          res.result.errorCode = err?.code;
          res.result.errorMessage = err?.sqlMessage;
          break;

        case "USER_BLOCKED":
          res.result.errorCode = type;
          res.result.errorMessage = "Пользователь заблокирован";
          break;

        case "EMAIL_NOT_CONFIRMED":
          res.result.errorCode = type;
          res.result.errorMessage = "Почта не подтверждена";
          break;

        case "AUTH_ERROR":
          res.result.errorCode = type;
          res.result.errorMessage = "Нет пользователя или неправильный пароль";
          break;

        default:
          res.result.errorCode = "UNKNOWN_ERROR";
          res.result.errorMessage = "Неизвестная ошибка";
          break;
      }
      res.json(res.result);
    };

    next();
  };
};
