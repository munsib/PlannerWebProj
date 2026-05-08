# Student Study Planner Backend

This project now uses the required backend structure for the assignment:

- `public/` contains the frontend HTML, JavaScript, images, and styles
- `server/models/` contains the database connection and model functions
- `server/routes/` contains the Express route handlers
- `index.js` is the server entry point

## Entities

- `User`
- `PlannerItem`

## API Routes

- `GET /api/users`
- `GET /api/planner-items`

## Setup

1. Run the SQL in `Tables.SQL` to create your tables.
2. Update the values in your local `.env` file with your MySQL credentials.
3. Install dependencies with `npm install`.
4. Start the server with `npm run dev`.

## Frontend Pages

- `http://localhost:3000/register.html`
- `http://localhost:3000/login.html`
- `http://localhost:3000/PlannerSkele.html`
