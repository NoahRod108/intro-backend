# showcase-backend

A REST API backend built with Node.js, Express, and MongoDB. Includes user authentication with JWT and bcrypt password hashing, plus full CRUD for posts.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:4000`.

## API Reference

### User Routes — `/api/v1/users`

| Method | Endpoint    | Description                   | Auth Required |
| ------ | ----------- | ----------------------------- | ------------- |
| POST   | `/register` | Register a new user           | No            |
| POST   | `/login`    | Login and receive a JWT token | No            |
| POST   | `/logout`   | Logout a user                 | No            |
| GET    | `/verify`   | Verify a JWT token            | Yes           |

### Post Routes — `/api/v1/posts`

| Method | Endpoint      | Description       | Auth Required |
| ------ | ------------- | ----------------- | ------------- |
| POST   | `/create`     | Create a new post | No            |
| GET    | `/getPosts`   | Get all posts     | No            |
| PATCH  | `/update/:id` | Update a post     | No            |
| DELETE | `/delete/:id` | Delete a post     | No            |

### Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Data Models

### User

| Field      | Type   | Constraints                   |
| ---------- | ------ | ----------------------------- |
| `username` | String | Required, unique, 1–30 chars  |
| `email`    | String | Required, unique              |
| `password` | String | Required, 8–50 chars (hashed) |

### Post

| Field         | Type   | Constraints     |
| ------------- | ------ | --------------- |
| `name`        | String | Required        |
| `description` | String | Required        |
| `age`         | Number | Required, 1–150 |

## Project Structure

```
intro-backend/
├── backend/
│   └── src/
│       ├── config/         # DB connection and constants
│       ├── controllers/    # Route handler logic
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routers
│       ├── app.js          # Express app setup
│       └── index.js        # Server entry point
├── frontend/               # Static files
├── .env
└── package.json
```
