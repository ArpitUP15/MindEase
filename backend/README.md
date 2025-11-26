# MindEase Backend (Node.js)

This backend replaces the previous Django implementation with a Node.js, Express, and MongoDB stack while preserving the original domain features (users, counseling sessions, resources, and feedback).

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file based on `env.sample` and fill in real values:

   ```bash
   cp env.sample .env
   ```

   Required variables:

   - `PORT` – Port the server should listen on (default `5000`).
   - `MONGODB_URI` – MongoDB connection string.
   - `JWT_SECRET` – Secret key used to sign JSON Web Tokens.
   - `JWT_EXPIRES_IN` – Token lifetime (e.g., `7d`).

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The server listens on `http://localhost:5000` by default and exposes a health check endpoint at `/health`.

4. **Production build**

   ```bash
   npm start
   ```

## API Overview

All routes (except authentication) require a Bearer token obtained via the login endpoint.

- `POST /api/auth/register` – Create a new user (supports `isCounselor`).
- `POST /api/auth/login` – Obtain a JWT using email and password.
- `GET /api/auth/me` – Retrieve the authenticated user profile.
- `GET /api/sessions` – List sessions (filterable by student, counselor, or status).
- `POST /api/sessions` – Schedule a new session between a student and counselor.
- `GET /api/sessions/:id` – Retrieve a session.
- `PATCH /api/sessions/:id` – Update session status or scheduled time.
- `DELETE /api/sessions/:id` – Cancel a session.
- `GET /api/resources` – List available resources.
- `POST /api/resources` – Add a resource.
- `PATCH /api/resources/:id` – Update a resource.
- `DELETE /api/resources/:id` – Remove a resource.
- `GET /api/feedback` – List feedback with session details.
- `POST /api/feedback` – Submit feedback for a session (one per session).

## Project Structure

```
src/
├── app.js               # Express app configuration
├── server.js            # Entry point
├── config/db.js         # MongoDB connection helper
├── controllers/         # Request handlers
├── middleware/          # Auth, validation, and error handling
├── models/              # Mongoose models
├── routes/              # Route definitions
└── utils/               # Shared helpers
```

## Testing

Automated tests are not configured yet. Use tools such as Postman or Thunder Client to exercise the APIs during development.

## Notes

- Ensure MongoDB is running locally or update `MONGODB_URI` to point to your hosted cluster.
- Passwords are hashed with bcrypt before storage.
- JWT tokens include the user ID and expire after the configured duration.

