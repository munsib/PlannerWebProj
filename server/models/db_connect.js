require("dotenv").config();
const mysql = require("mysql2");

const con = mysql.createPool({
    host: process.env.MYSQL_HOST || process.env.DB_HOST,
    user: process.env.MYSQL_USERNAME || process.env.DB_USER,
    password: process.env.MYSQL_PSWD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB || process.env.DB_NAME,
    port: Number(process.env.MYSQL_PORT || process.env.DB_PORT) || 3306
});

const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        con.query(sql, binding, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { con, query };
