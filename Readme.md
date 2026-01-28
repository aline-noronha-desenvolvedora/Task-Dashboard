# Task Dashboard

A fullstack task management app with authentication, CRUD operations, and a dashboard with charts.

Front-end: React + TailwindCSS  
Back-end: Node.js + Express + Prisma + SQLite  

---

## Features

- User authentication with JWT
- CRUD for tasks (title, description, status, category, dates)
- Dashboard with charts by status and category
- Filtering and sorting of tasks

---

## Tech Stack

**Front-end:** React, React Router, Axios, Chart.js, Tailwind CSS  
**Back-end:** Node.js, Express, JWT, Prisma, Bcrypt  
**Database:** SQLite (`dev.db` via Prisma)  

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/          # TaskForm.jsx, TaskList.jsx, Filters.jsx, charts/
│   ├── pages/               # Dashboard.jsx, Login.jsx, Register.jsx
│   ├── hooks/               # useTasks.js, useAuth.js
│   ├── services/            # api.js, taskService.js, authService.js
│   └── utils/               # chartUtils.js
│
backend/
├── src/
│   ├── application/services/   # taskService.js
│   ├── domain/entities/        # Task.js
│   ├── infrastructure/         # config/, providers/, repositories/, prisma/
│   └── presentation/           # controllers/, routes/, middlewares/
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

#### Install the back-end dependencies
cd server

npm install

#### Configure the environment variables
touch .env

DATABASE_URL="mysql://taskdashboard:SenhaSegura123@localhost:3306/TaskDashboardDB"

JWT_SECRET="Admin123!"

JWT_EXPIRES_IN="1h"

PORT=3000

#### Start MySQL and Create Database (Linux)
sudo service mysql start

mysql -u root -p

CREATE DATABASE TaskDashboardDB;

EXIT;

#### Create the prisma migrations
cd server/src/infrastructure/prisma

npx prisma migrate dev --name init

#### Run the Prisma migrations
cd ../

npx prisma db seed

#### View the data in Prisma Studio (Optional)
npx prisma studio

#### Start the back-end server
cd ../..

npm run dev

### 3. Front-end setup

#### Install the front-end dependencies
In another terminal: 

cd client

npm install

#### Start the development server

npm run dev

Vite will display the URL to access the application in the browser, usually:

http://localhost:5173/

---

## Initial Credentials

Admin user created via seed:

- Email: admin@taskdashboard.com
- Password: Admin123!

---

## Postman Collection

Import the collection to test the API:
[Task Dashboard Collection](https://.postman.co/workspace/My-Workspace~597093ab-78d5-4b81-856c-c40fd9bf8fd4/collection/21196668-401d7fd5-f211-4fcf-9f37-89e83b941d83?action=share&creator=21196668)

---

## Conclusion

Complete task management project with integrated front-end and back-end, authentication, CRUD, filters, charts, and layered architecture—ready for use and future extensions.
