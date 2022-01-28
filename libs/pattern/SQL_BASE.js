module.exports = (config) => {
  return {
    Login: `SELECT uid, email, role, blocked, confirmed, extended from ${config.db_prefix}_users where email=? and pass_hash=md5(?)`,
    Register: `INSERT into ${config.db_prefix}_users set role='${config.default_user_role}', email=?, pass_hash=md5(?), extended=?`,
    AddToken: `INSERT into ${config.db_prefix}_tokens set uid=?, token=?`,
    Confirm: `UPDATE ${config.db_prefix}_users, ${config.db_prefix}_tokens set confirmed=true where ${config.db_prefix}_users.uid=${config.db_prefix}_tokens.uid and token=?`,
    deleteToken: `DELETE from ${config.db_prefix}_tokens where token=?`,
  };
};
