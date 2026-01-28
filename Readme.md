# Task Dashboard

A fullstack task management app with authentication, CRUD operations, and a dashboard with charts.

Front-end: React + TailwindCSS  
Back-end: Node.js + Express + Prisma + Mysql

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
**Database:** Mysql


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
```bash
cd server
npm install
```

#### Configure the environment variables
```bash
DATABASE_URL="your connection here"
JWT_SECRET="Admin123!"
JWT_EXPIRES_IN="1h"
PORT=3000
```
#### Start MySQL and Create Database (Linux)
```bash
sudo service mysql start
mysql -u root -p
CREATE DATABASE TaskDashboardDB;
EXIT;
```

#### Create the prisma migrations
```bash
cd server/src/infrastructure/prisma
npx prisma migrate dev --name init
```
#### Run the Prisma migrations
```bash
cd ../
npx prisma db seed
```

#### View the data in Prisma Studio (Optional)
```bash
npx prisma studio
```

#### Start the back-end server
```bash
cd ../..
npm run dev
```

### 3. Front-end setup
#### Install the front-end dependencies
In another terminal:
```bash
cd client
npm install
```

#### Start the development server
```bash
npm run dev
```

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
[Task Dashboard Collection](https://www.postman.com/spaceflight-technologist-58832279/task-dashboard/collection/21196668-401d7fd5-f211-4fcf-9f37-89e83b941d83/?action=share&creator=21196668)