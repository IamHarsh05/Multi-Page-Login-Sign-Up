# User Authentication Backend

This project is a Node.js backend application for handling user authentication, profile management, and email verification using Express.js, MongoDB, and nodemailer.

## Description

The project provides APIs for user registration, login, logout, email verification, profile image upload, updating profile details, and user type management. It also includes middleware for authentication and a model for the user schema.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
Install dependencies:
bash


Copy code
cd your-repo
npm install
Usage
Set up your environment variables by creating a .env file in the root directory. You can use the .env.example file as a template.
Start the server:
bash


Copy code
npm start
Access the API endpoints using tools like Postman or curl.
Routes
/api/auth/register (POST): Register a new user.
/api/auth/login (POST): Log in an existing user.
/api/auth/logout (POST): Log out the current user.
/api/auth/verify-email (POST): Verify user's email using OTP.
/api/profile/image (PUT): Update profile image.
/api/profile (PUT): Update user's profile.
/api/userType (PUT): Update user's type.
/api/details (GET): Fetch user details.
Environment Variables
MONGO_URL: MongoDB connection URL.
PORT: Port number for the server to listen on.
NodeMailer_API: API key for nodemailer service.
JWT_Secret: Secret key for JWT token generation.
Frontend_URL: URL of the frontend application.
Dependencies
express: Fast, unopinionated, minimalist web framework for Node.js.
mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
nodemailer: Module for sending emails.
bcryptjs: Library to hash passwords.
jsonwebtoken: Implementation of JSON Web Tokens.
multer: Middleware for handling multipart/form-data.
firebase-admin: Firebase Admin SDK for managing Firebase services.
```
