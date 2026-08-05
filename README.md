# AnyTime

AnyTime is a realtime chat application with secure authentication, profile editing, image sharing, and online presence. It uses React + Vite on the frontend and Express + MongoDB on the backend.

## Features

- Email/password signup and login with JWT authentication
- Client-side and server-side validation for credentials
- Password visibility toggle on auth forms
- Profile update with avatar upload support
- Realtime online/offline presence with Socket.IO
- Private 1:1 chat conversations
- Unread message badges and media gallery per chat
- Responsive UI for desktop and mobile

## Tech Stack

Frontend

- React 19 + Vite
- Tailwind CSS v4
- React Router
- Axios
- react-hot-toast
- socket.io-client

Backend

- Node.js + Express 5
- MongoDB + Mongoose
- bcryptjs
- JSON Web Tokens
- Socket.IO
- Cloudinary image upload

## Getting Started (Local)

Prerequisites

- Node.js 18+
- MongoDB instance
- Cloudinary account (optional for image uploads)

1. Backend
   - Go to the `server/` folder and install dependencies.
   - Create a `.env` file with the variables below.
   - Start the backend server.

   ```bash
   cd server
   npm install
   npm run dev
   ```

2. Frontend
   - Go to the `client/` folder and install dependencies.
   - Create a `.env` file.
   - Start the Vite dev server.

   ```bash
   cd client
   npm install
   npm run dev
   ```

By default the frontend is configured to connect to `http://localhost:5000`.

## Environment Variables (Backend)

- `PORT=5000`
- `MONGODB_URI=mongodb_connection_string`
- `JWT_SECRET=your_jwt_secret`
- `CLOUDINARY_CLOUD_NAME=cloud_name`
- `CLOUDINARY_API_KEY=cloudinary_api_key`
- `CLOUDINARY_API_SECRET=cloudinary_api_secret`

## Environment Variables (Frontend)

- `VITE_BACKEND_URL=http://localhost:5000`

## API Routes

Base URL: `/api/auth`

| Method | Endpoint          | Auth | Purpose                             |
| ------ | ----------------- | ---- | ----------------------------------- |
| POST   | `/signup`         | No   | Register a new user                 |
| POST   | `/login`          | No   | Login and return token              |
| GET    | `/check`          | Yes  | Validate token and return user info |
| PUT    | `/update-profile` | Yes  | Update current user profile         |

Base URL: `/api/messages`

| Method | Endpoint    | Auth | Purpose                             |
| ------ | ----------- | ---- | ----------------------------------- |
| GET    | `/users`    | Yes  | Get other users and unread counts   |
| GET    | `/:id`      | Yes  | Get chat messages for selected user |
| PUT    | `/mark/:id` | Yes  | Mark a message as seen              |
| POST   | `/send/:id` | Yes  | Send a message to selected user     |

## Auth Notes

- Auth uses a JWT token stored in `localStorage`.
- The frontend attaches the token to API requests via Axios headers.
- The backend validates email format and enforces a strong password policy during signup.

## Repository Structure

- `client/` — React frontend app
- `server/` — Express backend API
