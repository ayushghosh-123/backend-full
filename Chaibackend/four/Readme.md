# Chaibackend `four` — Industry-Level Backend Bootcamp Architecture

## Overview

This repository demonstrates an industry-style Node.js backend architecture built with modern best practices for production-ready backend applications. It is designed as a bootcamp project that teaches how to structure, modularize, secure, and scale a backend service.

Key learnings included:
- Express server setup with modular routes
- MongoDB connection and Mongoose models
- JWT access and refresh token authentication
- Cloudinary file upload integration
- Middleware pattern for validation, auth, and uploads
- Centralized API response and error handling

## Project Structure

```
four/
├── .env
├── package.json
├── public/
│   └── temp/            # Temporary uploads before Cloudinary
├── src/
│   ├── app.js           # Express application, middleware, route registration
│   ├── index.js         # Bootstraps dotenv, DB connection, server start
│   ├── db/
│   │   └── index.js     # MongoDB connection logic
│   ├── routes/
│   │   └── User.routes.js  # User-related route definitions
│   ├── controllers/
│   │   └── user.controller.js # Business logic and request handlers
│   ├── models/
│   │   ├── user.model.js
│   │   ├── video.model.js
│   │   └── subscription.model.js
│   ├── middlewares/
│   │   ├── auth.middleware.js  # JWT validation
│   │   └── multer.middleware.js # file upload handling
│   └── utils/
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       └── Cloudinary.js
└── note.txt
```

## Architecture and Patterns

- `src/index.js` is the entry point. It loads environment variables, connects to MongoDB, then starts the Express server.
- `src/app.js` configures middleware, security, body parsing, static file serving, and route registration.
- `src/db/index.js` isolates database connection logic for reusability and testability.
- `src/routes` defines clean route paths and attaches controller methods.
- `src/controllers` contains request handling logic, validation, and response composition.
- `src/models` contains Mongoose schemas for domain entities.
- `src/middlewares` implements reusable request pipeline functions like auth and file upload.
- `src/utils` holds shared helpers for API response formatting, error construction, async handler wrapping, and Cloudinary uploads.

## Data Flow / Workflow

1. Client sends a request to an API endpoint.
   - Example: `POST /api/v1/users/register` or `POST /api/v1/users/login`.
2. `src/app.js` receives the request and passes it through global middleware.
   - CORS is validated
   - JSON and URL-encoded bodies are parsed
   - Cookies are parsed
   - Static file middleware serves public assets if needed
3. Route matching occurs in `src/routes/User.routes.js`.
   - Upload middleware is applied for file-based routes
   - Auth middleware is applied for protected routes
4. The route controller in `src/controllers/user.controller.js` executes business logic.
   - Input fields are validated
   - Database queries are executed through Mongoose models
   - files are uploaded to Cloudinary when required
   - tokens are generated and cookies are set
5. Controller returns a structured response using `src/utils/ApiResponse.js` or throws an `ApiError`.
6. If the route is protected, `src/middlewares/auth.middleware.js` checks the JWT access token.
   - Token is read from cookies or Authorization header
   - Payload is verified against secret keys
   - User is loaded from MongoDB and attached to `req.user`
7. If Cloudinary uploads are used, `src/utils/Cloudinary.js` uploads the file and removes the temporary local file.
8. `src/db/index.js` keeps the MongoDB connection alive for all requests.
   - A single connection is established at application startup
   - All Mongoose operations reuse that connection

## Data Flow Diagram

```text
Client
  |
  | HTTP Request
  v
src/app.js
  |-- Global middleware (CORS, body parser, cookies)
  v
Route matching
  |
  | /api/v1/users/*
  v
src/routes/User.routes.js
  |-- multer upload middleware (register)
  |-- auth middleware (protected routes)
  v
src/controllers/user.controller.js
  |-- Input validation
  |-- Business logic
  |-- File upload to Cloudinary
  |-- JWT token creation
  v
src/models/*.js
  |-- Mongoose queries
  |-- MongoDB data access
  v
MongoDB

Optional:
  |-- Cloudinary for file storage
  v
src/utils/Cloudinary.js

Response path:
MongoDB / Cloudinary -> Controller -> ApiResponse -> Client
```

### Example: Register User Workflow

- Client submits `POST /api/v1/users/register` with form data and image files.
- Multer middleware saves files to `public/temp`.
- Controller validates the input and uploads files to Cloudinary.
- A new user document is created in MongoDB with hashed password and Cloudinary URLs.
- API responds with a consistent success object.

### Example: Login / Auth Workflow

- Client submits `POST /api/v1/users/login` with credentials.
- Controller verifies the user and password.
- Access and refresh tokens are generated and stored in cookies.
- The client can call protected routes using `verifyJwt` middleware.

## Core Features

### Authentication
- JWT access token + refresh token flow
- `login` and `register` endpoints
- `verifyJwt` middleware protects secured routes
- Refresh token rotation for session management
- Cookie-based token storage for secure browser use

### File Uploads
- Multer stores uploads temporarily in `public/temp`
- Cloudinary uploads are handled in `src/utils/Cloudinary.js`
- Local temp files are cleaned up after upload

### User Management
- Registration with avatar and cover image upload
- Login with email/username + password
- Secure password hashing with `bcrypt`
- Profile updates, logout, and token refresh endpoints

## Environment Variables

Create a `.env` file with values similar to:

```
PORT=8000
MONGODB_URL=mongodb+srv://username:password@host/dbname
CORS_ORIGIN=http://localhost:3000
ACESS_TOKEN_SECRET=yourAccessTokenSecret
ACESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
REFRESH_TOKEN_EXPIRARY=7d
COUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourCloudinaryApiKey
CLOUDINARY_API_SECRET=yourCloudinaryApiSecret
```

> Note: The code currently uses the exact env names shown above, including spelling from source files.

## Installation

```bash
cd Chaibackend/four
npm install
```

## Run Locally

```bash
npm run dev
```

The server starts from `src/index.js` and listens on `PORT` or `8000` by default.

## Why This Structure Matters for Industry

- Separation of concerns: routes, controllers, models, middlewares, and utils are isolated
- Reusability: shared helper modules and middleware can be extended easily
- Maintainability: clear folder structure supports team collaboration
- Security: JWT auth, cookie options, CORS, and file upload handling
- Scalability: modular code supports future features like role-based auth, pagination, and microservices

## Next Bootcamp Improvements

Common industry upgrades for the next phase:
- Add centralized error-handling middleware and logging
- Add request validation with Zod/Joi
- Add unit/integration tests
- Add rate limiting and security headers
- Add versioned API routes and feature flags
- Add role-based access control and permissions

---

Built for the `Chaibackend/four` backend bootcamp series. Keep the structure modular, testable, and production-ready.