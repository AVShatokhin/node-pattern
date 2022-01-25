module.exports = (config) => {
  return (req, res, next) => {
    req.config = config;
    next();
  };
};
