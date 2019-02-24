module.exports = (mysql) => {
    let config = require('./config.json');
    let pool  = mysql.createPool({
        connectionLimit : 5,
        host            : process.env.MYSQL_ADDON_USER | config.database.user,
        user            : process.env.MYSQL_ADDON_USER | config.database.user,
        password        : process.env.MYSQL_ADDON_PASSWORD | config.database.password,
        database        : process.env.MYSQL_ADDON_DB | config.database.host
    });
}
