# 🔐 User Authentication & Update Details Backend

This project is a Node.js backend application for handling user authentication, profile management, and email verification using Express.js, MongoDB, and nodemailer. 📝

## 🌟 Features

- User registration and login with email verification
- Profile image upload and update
- Update user profile details
- Manage user types (admin, user, etc.)
- Secure authentication using JSON Web Tokens (JWT)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or remote)
- Nodemailer API key (for email service)
- Firebase service account (for image upload)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
```

2. Install dependencies:

```bash
    cd your-repo
    npm install
```

3. Set up Environment Variables:

   - Set up environment variables by creating a .env file in the root directory. You can use the example as a template.

   ## Environment Variables

   The following environment variables are used in this project:

   - `PORT`: Port number for the server to listen on. Default value is `5000`.
   - `MONGO_URL`: MongoDB connection URL.
   - `JWT_Secret`: Secret key for JWT token generation.
   - `NodeMailer_API`: API key for nodemailer service.
   - `Frontend_URL`: URL of the frontend application.
   - `ServiceAccount_type`: Type of the service account used for Firebase Admin SDK.
   - `ServiceAccount_project_id`: Firebase project ID.
   - `ServiceAccount_private_key_id`: Private key ID for Firebase Admin SDK.
   - `ServiceAccount_private_key`: Private key for Firebase Admin SDK.
   - `ServiceAccount_client_email`: Client email for Firebase Admin SDK.
   - `ServiceAccount_client_id`: Client ID for Firebase Admin SDK.
   - `ServiceAccount_auth_uri`: Authorization URI for Firebase Admin SDK.
   - `ServiceAccount_token_uri`: Token URI for Firebase Admin SDK.
   - `ServiceAccount_auth_provider_x509_cert_url`: Authorization provider x509 certificate URL for Firebase Admin SDK.
   - `ServiceAccount_client_x509_cert_url`: Client x509 certificate URL for Firebase Admin SDK.
   - `ServiceAccount_universe_domain`: Universe domain for Firebase Admin SDK.

   Make sure to set up these environment variables before running the project.

4. Start the server:

```bash
    npm start
```

### 🌐 API Routes

- POST /api/auth/register: Register a new user
- POST /api/auth/login: Log in an existing user
- POST /api/auth/logout: Log out the current user
- POST /api/auth/verify-email: Verify user's email using OTP
- PUT /api/profile/image: Update profile image
- PUT /api/profile: Update user's profile
- PUT /api/userType: Update user's type
- GET /api/details: Fetch user details

### 🛠 Project Structure

project/
│
├── node_modules/ # Directory for installed dependencies (automatically created)
│
├── Mail/
│ ├── mail.js # Send Mail functionality 📧
│
├── middleware/
│ ├── authMiddleware/ # Authentication middleware 🔒
│
├── model/
│ ├── User/ # User model schema 👤
│
├── routes/
│ ├── auth.js # Authentication APIs 🔑
│ ├── details.js # User details API 📝
│ ├── profile.js # Profile update APIs 🖼️
│ ├── userType.js # User type update API ✨
│
├── utils/
│ ├── firebase.js # Firebase image upload utility 📷
│ ├── credentials.js # Firebase credentials 🔑
│
├── package.json # Project metadata and dependencies 📦
├── package-lock.json # Automatically generated npm dependencies 🔒
│
└── server.js # Main server file 🚀

### 🙏 Acknowledgements

- Express.js - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - NoSQL database
- Nodemailer - Module for sending emails
- bcryptjs - Library for hashing passwords
- jsonwebtoken - JSON Web Token implementation
- Multer - Middleware for handling multipart/form-data
- Firebase Admin SDK - For managing Firebase services
- Made with ❤️ by [Harshkumar Chaudhari](https://github.com/IamHarsh05)

This README file includes:

- A brief description of the project and its features
- Prerequisites and installation instructions
- API routes with brief descriptions
- Project structure with an attractive directory tree and emoji icons
- Environment variables required for the project
- Contributing guidelines and license information
- Acknowledgments for the libraries and tools used in the project

Feel free to modify or add more sections as per your project's requirements.
