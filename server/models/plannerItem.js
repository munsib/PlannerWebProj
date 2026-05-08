const db = require("./db_connect");

async function createPlannerItem({ title, description, itemType, dueDate, userId }) {
    const [result] = await db.execute(
        `INSERT INTO planner_items (title, description, item_type, due_date, user_id)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, itemType, dueDate || null, userId]
    );

    return {
        planner_item_id: result.insertId,
        title,
        description,
        item_type: itemType,
        due_date: dueDate || null,
        user_id: userId,
        is_complete: 0
    };
}

async function getPlannerItemById(plannerItemId) {
    const [rows] = await db.execute(
        `SELECT planner_item_id, title, description, item_type, is_complete, due_date, user_id
         FROM planner_items
         WHERE planner_item_id = ?`,
        [plannerItemId]
    );

    return rows[0] || null;
}

async function updatePlannerItem(plannerItemId, { title, description, itemType, dueDate, isComplete }) {
    const [result] = await db.execute(
        `UPDATE planner_items
         SET title = ?,
             description = ?,
             item_type = ?,
             due_date = ?,
             is_complete = ?
         WHERE planner_item_id = ?`,
        [title, description, itemType, dueDate || null, isComplete ? 1 : 0, plannerItemId]
    );

    return result.affectedRows;
}

async function deletePlannerItem(plannerItemId) {
    const [result] = await db.execute(
        "DELETE FROM planner_items WHERE planner_item_id = ?",
        [plannerItemId]
    );

    return result.affectedRows;
}

module.exports = {
    createPlannerItem,
    getPlannerItemById,
    updatePlannerItem,
    deletePlannerItem
};
