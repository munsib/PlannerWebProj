const db = require("./db_connect");

async function getAllUsers() {
    const [rows] = await db.execute(
        `SELECT user_id, first_name, last_name, email, username
         FROM users
         ORDER BY user_id ASC`
    );

    return rows;
}

module.exports = {
    getAllUsers
};
