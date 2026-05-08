const bcrypt = require("bcrypt");
const db = require("./db_connect");

const SALT_ROUNDS = 10;

async function createUser({ firstName, lastName, username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await db.execute(
        `INSERT INTO users (first_name, last_name, username, email, password)
         VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, username, email, hashedPassword]
    );

    return {
        user_id: result.insertId,
        first_name: firstName,
        last_name: lastName,
        username,
        email
    };
}

async function loginUser({ identifier, password }) {
    const [rows] = await db.execute(
        `SELECT user_id, first_name, last_name, username, email, password
         FROM users
         WHERE email = ? OR username = ?
         LIMIT 1`,
        [identifier, identifier]
    );

    if (rows.length === 0) {
        return null;
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return null;
    }

    return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email
    };
}

async function updateUser(userId, { firstName, lastName, username, email, password }) {
    let hashedPassword = null;

    if (password) {
        hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const [result] = await db.execute(
        `UPDATE users
         SET first_name = ?,
             last_name = ?,
             username = ?,
             email = ?,
             password = COALESCE(?, password)
         WHERE user_id = ?`,
        [firstName, lastName, username, email, hashedPassword, userId]
    );

    return result.affectedRows;
}

async function deleteUser(userId) {
    const [result] = await db.execute(
        "DELETE FROM users WHERE user_id = ?",
        [userId]
    );

    return result.affectedRows;
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
