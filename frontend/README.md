# Frontend of Multi Page Login / Signup App

## Description

This is the frontend client for your MERN (MongoDB, Express, React, Node.js) stack application. It provides the user interface and interacts with the backend server to fetch and display data, handle user authentication, and manage user interactions.

## Prerequisites

- Node.js installed on your machine
- A running backend server (provided separately) accessible via API endpoints

## Installation

1. Clone this repository to your local machine.
2. Navigate to the `frontend` directory: `cd frontend`.
3. Install dependencies by running: `npm install`.

## Configuration

1. Update the `.env` file in the `frontend` directory with the necessary environment variables, such as the API URL of your backend server.

## Usage

1. Start the development server: `npm start`.
2. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).
3. Interact with the frontend user interface to register, log in, navigate through pages, and perform various actions.

## Features

- **User Authentication:** Register new users, log in existing users, and log out authenticated users.
- **Protected Routes:** Certain routes are accessible only to authenticated users. Unauthorized users are redirected to the login page.
- **Profile Management:** Edit user profile details, change password, and view user details.
- **Email Verification:** Send verification emails to users and verify user emails using OTP.

## Technologies Used

- **React.js:** Frontend JavaScript library for building user interfaces.
- **React Router:** Declarative routing for React applications, enabling navigation between different views.
- **Axios:** Promise-based HTTP client for making API requests from the frontend.
- **Tailwind CSS (or your preferred styling framework):** Utility-first CSS framework for styling components.
- **Context API:** State management tool in React for managing user authentication state and other application-level states.

## Folder Structure

- **src/components:** Contains reusable components used throughout the application.
- **src/pages:** Contains individual page components for different routes.
- **src/context:** Contains context providers and consumers for managing application-level states.
- **src/utils:** Contains utility functions and helper modules.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
