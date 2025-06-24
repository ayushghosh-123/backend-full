# BACKEND BUNCH 🏎️

A collection of backend and fullstack learning projects, code samples, and notes.

---

## 📁 Folder Structure

- **fullstack basics/**
  - `backend - 1/`  
    - Authentication, CRUD, ExpressJs, Mongoose, Node basics, and more
  - `Backend project/`  
    - Project-based backend apps
  - `Chai backend/`  
    - Industry-level backend series and demos
  - `Frontend/`  
    - React + Vite frontend templates and CORS notes

## 📝 Topics Covered

- Node.js basics and NPM usage
- Express.js framework and middleware
- MongoDB, Mongoose, and data modeling
- Authentication & Authorization (JWT, bcrypt, cookies, sessions)
- CRUD operations (Create, Read, Update, Delete)
- Dynamic Routing and EJS templating
- File system operations in Node.js
- Fullstack project structure (backend + frontend)
- CORS and connecting frontend to backend

## 🚀 How to Use

1. **Navigate** to any subfolder for a specific topic or project.
2. **Read** the included notes (`Note.txt`, `Readme.md`) for explanations and instructions.
3. **Run** backend projects with:

 ```sh
   npm install
   node app.js
```

```sh
npm start
```

Frontend -

```sh
npm install
npm run dev
```

# Node.js Express Backend Starter

This project is a basic backend setup using Node.js, Express, and MongoDB (with Mongoose). It includes essential packages and structure for building scalable REST APIs.

## Features

- Express.js server
- MongoDB integration with Mongoose
- Environment variable management with dotenv
- CORS enabled
- Cookie parsing
- JWT authentication
- Password hashing with bcrypt
- File upload support with multer
- Security headers with helmet
- HTTP request logging with morgan
- Error handling utilities

## Essential Packages

| Package            | Purpose                          |
|--------------------|----------------------------------|
| express            | Web framework                    |
| dotenv             | Environment variables            |
| mongoose           | MongoDB ORM                      |
| cors               | Cross-Origin Resource Sharing    |
| cookie-parser      | Cookie parsing                   |
| bcrypt             | Password hashing                 |
| jsonwebtoken       | JWT authentication               |
| multer             | File uploads                     |
| helmet             | Security headers                 |
| morgan             | HTTP request logging             |
| validator          | Data validation                  |
| nodemon (dev)      | Auto-restart server (dev only)   |

## Getting Started

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:
   ```
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**
   ```sh
   npm run dev
   ```
   or
   ```sh
   node src/index.js
   ```

## Scripts

- `npm run dev` – Start server with nodemon (development)
- `npm start` – Start server with Node.js

## Folder Structure

```
src/
  controllers/
  models/
  routes/
  middlewares/
  utils/
  app.js
  index.js
.env
```

## License
MIT