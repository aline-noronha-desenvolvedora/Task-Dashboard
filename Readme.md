# Task Dashboard

A fullstack application for task management with authentication, CRUD operations, and a dashboard with charts.

Front-end built with React and back-end with Node.js/Express, integrated with a relational database using Prisma and SQLite.

---

## Features

- User authentication with JWT
- Full CRUD for tasks (create, read, update, delete)
- Task fields:
   - Title
   - Description
   - Status (`pending`, `in_progress`, `completed`)
   - Category
   - Creation date
   - Optional completion date
- Dashboard with charts:
   - Tasks by status
   - Tasks by category
- Filtering by status, category, and date
- Sorting by creation date or status

---

## Technologies

### Front-end
- React
- React Router
- Axios
- Chart.js
- Tailwind CSS

### Back-end
- Node.js
- Express
- JWT
- Prisma
- Bcrypt

### Database
- SQLite
- Database file `dev.db` automatically created by Prisma

---

## Project Structure

```text
project-root/
│
├── backend/
│   ├── src/            
│   ├── prisma/         
│   └── package.json
│
├── frontend/
│   ├── src/            
│   └── package.json
│
└── README.md
```

---

## Installation & Execution

### 1. Clone the repository

```bash
git clone git@github.com:aline-noronha-desenvolvedora/Task-Dashboard.git
cd task-dashboard
```

---

### 2. Back-end setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
```

Run migrations and seed the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

Open Prisma Studio to inspect and manage data:

```bash
npx prisma studio
```

Start the server (open a dedicated terminal):

```bash
npm run dev
```

---

### 3. Front-end setup

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## Initial Credentials

Admin user created via seed:

- Email: admin@taskdashboard.com
- Password: Admin123!

---

## Main Endpoints

### Health Check
- GET `/health`

### Authentication
- POST `/auth/register`
- POST `/auth/login`

### Tasks
- GET `/tasks`
- POST `/tasks`
- PUT `/tasks/:id`
- DELETE `/tasks/:id`

---

## Postman Collection

To test the endpoints, import the Postman collection available at:

https://.postman.co/workspace/My-Workspace~597093ab-78d5-4b81-856c-c40fd9bf8fd4/collection/21196668-401d7fd5-f211-4fcf-9f37-89e83b941d83?action=share&creator=21196668

---

## Conclusion

This project delivers:

- Complete source code (front-end and back-end)
- Detailed README with technical instructions
- Initial database with admin user and sample tasks
- Prisma Studio command for easy data inspection
- Clear execution using one terminal for the server and another for the client
- Postman collection for quick API testing