module.exports = (config) => {
  return {
    Login: `SELECT uid, email, roles, blocked, confirmed, extended from ${config.db_prefix}_users where email=? and pass_hash=md5(?)`,
    getUsers: `SELECT uid, email, roles, blocked, confirmed, extended from ${config.db_prefix}_users`,
    Register: `INSERT into ${config.db_prefix}_users set roles='["${config.default_user_role}"]', email=?, pass_hash=md5(?), extended=?`,
    Confirm: `UPDATE ${config.db_prefix}_users, ${config.db_prefix}_tokens set confirmed=true where ${config.db_prefix}_users.uid=${config.db_prefix}_tokens.uid and token=?`,
    Recover: `SELECT uid from ${config.db_prefix}_users where email=?`,
    setPassword: `UPDATE ${config.db_prefix}_users set pass_hash=md5(?) where uid=?`,
    changePassword: `UPDATE ${config.db_prefix}_users set pass_hash=md5(?) where pass_hash=md5(?) and uid=?`,
    AddToken: `INSERT into ${config.db_prefix}_tokens set uid=?, token=?`,
    deleteToken: `DELETE from ${config.db_prefix}_tokens where token=?`,
    sessionGetUserByToken: `SELECT ${config.db_prefix}_users.uid, email, roles, blocked, confirmed, extended, token from ${config.db_prefix}_users, ${config.db_prefix}_tokens where token=? and ${config.db_prefix}_users.uid=${config.db_prefix}_tokens.uid`,
    saveProfile: `UPDATE ${config.db_prefix}_users, ${config.db_prefix}_tokens set extended=? where ${config.db_prefix}_users.uid=${config.db_prefix}_tokens.uid and token=?`,
    adminAddUser: `INSERT into ${config.db_prefix}_users set roles='["${config.default_user_role}"]', email=?, pass_hash=md5(?), extended=?`,
    adminUpdateUserInfo: `UPDATE ${config.db_prefix}_users, ${config.db_prefix}_tokens set email=?, extended=? where ${config.db_prefix}_users.uid=?`,
    adminDeleteUser: `DELETE FROM ${config.db_prefix}_users where ${config.db_prefix}_users.uid=?`,
    adminUpdateUserPassword: `UPDATE ${config.db_prefix}_users set pass_hash=md5(?) where uid=?`,
    adminConfirmEmail: `UPDATE ${config.db_prefix}_users set confirmed=true where uid=?`,
    adminResetConfirmEmail: `UPDATE ${config.db_prefix}_users set confirmed=false where uid=?`,
    adminBlockUser: `UPDATE ${config.db_prefix}_users set blocked=true where uid=?`,
    adminUnBlockUser: `UPDATE ${config.db_prefix}_users set blocked=false where uid=?`,
    adminGetSessions: `SELECT uid, count(*) as sessions FROM ${config.db_prefix}_tokens GROUP BY uid`,
  };
};
