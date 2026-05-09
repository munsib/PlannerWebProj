const con = require("./db_connect");

async function createPlannerItemTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS planner_items (
        planner_item_id INT AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        item_type VARCHAR(50) DEFAULT 'study session',
        is_complete BOOLEAN DEFAULT FALSE,
        due_date DATE,
        user_id INT NOT NULL,
        CONSTRAINT plannerItemPK PRIMARY KEY(planner_item_id),
        CONSTRAINT plannerItemUserFK
          FOREIGN KEY(user_id) REFERENCES users(user_id)
          ON DELETE CASCADE
      );
    `;

    await con.query(sql);
}

createPlannerItemTable();

async function getAllPlannerItems() {
    const sql = `
      SELECT * FROM planner_items;
    `;

    return await con.query(sql);
}

async function createPlannerItem(plannerItem) {
    const sql = `
      INSERT INTO planner_items(title, description, item_type, due_date, user_id)
      VALUES(?, ?, ?, ?, ?)
    `;

    const result = await con.query(sql, [
        plannerItem.title,
        plannerItem.description,
        plannerItem.itemType,
        plannerItem.dueDate || null,
        plannerItem.userId
    ]);

    return {
        planner_item_id: result.insertId,
        title: plannerItem.title,
        description: plannerItem.description,
        item_type: plannerItem.itemType,
        due_date: plannerItem.dueDate || null,
        user_id: plannerItem.userId,
        is_complete: 0
    };
}

async function getPlannerItemById(plannerItemId) {
    const sql = `
      SELECT * FROM planner_items
      WHERE planner_item_id = ?
    `;

    const plannerItems = await con.query(sql, [plannerItemId]);
    return plannerItems[0];
}

async function updatePlannerItem(plannerItemId, plannerItem) {
    const sql = `
      UPDATE planner_items
      SET title = ?,
          description = ?,
          item_type = ?,
          due_date = ?,
          is_complete = ?
      WHERE planner_item_id = ?
    `;

    const result = await con.query(sql, [
        plannerItem.title,
        plannerItem.description,
        plannerItem.itemType,
        plannerItem.dueDate || null,
        plannerItem.isComplete ? 1 : 0,
        plannerItemId
    ]);

    return result.affectedRows;
}

async function deletePlannerItem(plannerItemId) {
    const sql = `
      DELETE FROM planner_items
      WHERE planner_item_id = ?
    `;

    const result = await con.query(sql, [plannerItemId]);
    return result.affectedRows;
}

module.exports = {
    getAllPlannerItems,
    createPlannerItem,
    getPlannerItemById,
    updatePlannerItem,
    deletePlannerItem
};
