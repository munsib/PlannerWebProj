const db = require("./db_connect");

async function getAllPlannerItems() {
    const [rows] = await db.execute(
        `SELECT planner_item_id, title, description, item_type, is_complete, due_date, user_id
         FROM planner_items
         ORDER BY planner_item_id ASC`
    );

    return rows;
}

module.exports = {
    getAllPlannerItems
};
