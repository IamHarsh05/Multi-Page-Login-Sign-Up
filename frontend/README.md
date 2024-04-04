# 🔐 Frontend of Multi Page Login / Signup App

## Description

Welcome to the frontend client for your MERN (MongoDB, Express, React, Node.js) stack application. This frontend provides the user interface, interacts with the backend server, and handles user authentication and interactions.

## 🚀 Getting Started

To get started with the frontend client, follow the instructions below:

## Prerequisites

- Node.js installed on your machine 🚀
- A running backend server (provided separately) accessible via API endpoints 📡

## Installation

1. Clone this repository to your local machine.
2. Navigate to the `frontend` directory: `cd frontend`.
3. Install dependencies by running: `npm install` 📦

## Configuration

Add the `.env` file in the `frontend` directory with the necessary environment variables, such as the API URL of your backend server. Example:

```bash
    REACT_APP_API_URL= backend url
```

## Usage

1. Start the development server: `npm start` 🖥️
2. Access the application in your web browser at [http://localhost:3000](http://localhost:3000) 🌐
3. Interact with the frontend user interface to register, log in, navigate through pages, and perform various actions.

## 🌟 Features

- **User Authentication:** Register new users, log in existing users, and log out authenticated users.
- **Protected Routes:** Certain routes are accessible only to authenticated users. Unauthorized users are redirected to the login page.
- **Profile Management:** Edit user profile details, change and view user details.
- **Email Verification:** Send verification emails to users and verify user emails using OTP.

## 🎨 Technologies Used

- **React.js:** Frontend JavaScript library for building user interfaces.
- **React Router:** Declarative routing for React applications, enabling navigation between different views.
- **Axios:** Promise-based HTTP client for making API requests from the frontend.
- **Tailwind CSS (or your preferred styling framework):** Utility-first CSS framework for styling components.
- **Context API:** State management tool in React for managing user authentication state and other application-level states.

## 📁 Folder Structure

```bash
    frontend/
        ├── public/             # Static assets and index.html
        ├── src/                # Source code directory
        │   ├── components/     # Reusable UI components
        │   ├── context/        # Context providers and consumers
        │   ├── app.js          # Page components for different routes
        │   └── ProtectedRoute  # Authenticated Routing
        ├── .env                # Environment variables file
        ├── package.json        # Project metadata and dependencies
        └── README.md           # Frontend README file
```

## 🙏 Acknowledgements
- React.js, React Router, Axios, Tailwind CSS
- Context API for state management
- Made with ❤️ by [Harshkumar Chaudhari](https://github.com/IamHarsh05)

Feel free to customize this README file further to fit your project's specific details and requirements!
