const con = require("./db_connect");
const bcrypt = require("bcrypt");

async function createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        CONSTRAINT userPK PRIMARY KEY(user_id)
      );
    `;

    await con.query(sql);
}

createUserTable();

async function getUserByIdentifier(identifier) {
    const sql = `
      SELECT * FROM users
      WHERE email = ? OR username = ?
    `;

    const cUser = await con.query(sql, [identifier, identifier]);
    return cUser[0];
}

async function getAllUsers() {
    const sql = `
      SELECT user_id, first_name, last_name, username, email FROM users;
    `;

    return await con.query(sql);
}

async function register(user) {
    const existingByEmail = await getUserByIdentifier(user.email);
    const existingByUsername = await getUserByIdentifier(user.username);

    if (existingByEmail || existingByUsername) {
        throw Error("Username or email already in use!");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const sql = `
      INSERT INTO users(first_name, last_name, username, password, email)
      VALUES(?, ?, ?, ?, ?)
    `;

    await con.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        hashedPassword,
        user.email
    ]);

    return await login({
        identifier: user.email,
        password: user.password
    });
}

async function login(user) {
    const cUser = await getUserByIdentifier(user.identifier);

    if (!cUser) {
        throw Error("Username or email not found!");
    }

    const match = await bcrypt.compare(user.password, cUser.password);

    if (!match) {
        throw Error("Password Incorrect!");
    }

    return cUser;
}

async function updateUser(userId, user) {
    let sql = `
      UPDATE users
      SET first_name = ?,
          last_name = ?,
          username = ?,
          email = ?
      WHERE user_id = ?
    `;

    let binding = [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        userId
    ];

    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        sql = `
          UPDATE users
          SET first_name = ?,
              last_name = ?,
              username = ?,
              password = ?,
              email = ?
          WHERE user_id = ?
        `;
        binding = [
            user.firstName,
            user.lastName,
            user.username,
            hashedPassword,
            user.email,
            userId
        ];
    }

    const result = await con.query(sql, binding);
    return result.affectedRows;
}

async function deleteUser(userId) {
    const sql = `
      DELETE FROM users
      WHERE user_id = ?
    `;

    const result = await con.query(sql, [userId]);
    return result.affectedRows;
}

module.exports = { getAllUsers, register, login, updateUser, deleteUser };
