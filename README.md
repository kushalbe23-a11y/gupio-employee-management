# Gupio Employee Management System

Full-stack Employee Management System built for the Gupio Campus Placement Development Practical Assignment — Full Stack Developer, Option 1.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose
- Styling: CSS

## Features
- Employee list and details
- Create, edit and delete employees
- Search by name/email
- Department filtering
- Pagination
- Dashboard statistics
- Client/API validation and clear errors
- Loading, empty and error states
- Health check
- REST API documentation
- Seed data for demonstration

## Architecture
React Frontend → Express REST API → Mongoose → MongoDB Atlas

## Employee fields
- name
- email
- department
- designation

## API
- GET /api/health
- GET /api/employees
- GET /api/employees/:id
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id

Query parameters for GET /api/employees: `search`, `department`, `page`, `limit`.

## Environment variables
Backend `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=http://localhost:5173
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files or database credentials.

## Local setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Verification checklist
1. Create employee
2. Refresh and verify persistence
3. Search/filter employee
4. Open employee details
5. Edit employee
6. Delete employee
7. Verify invalid input handling
8. Verify missing-record handling
9. Verify `/api/health`

## Deployment
Recommended deployment shape:
- Frontend: Vercel/Netlify
- Backend: Render/Vercel
- Database: MongoDB Atlas

Set production environment variables on the hosting platforms and verify the deployed frontend can reach the deployed backend.

## Assignment
Role: Full Stack Developer
Option: 1 — Employee Management System
