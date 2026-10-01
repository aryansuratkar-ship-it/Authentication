🔐 Authentication System

A full-stack user authentication system built using Node.js, Express.js, MongoDB, EJS, JWT, and bcrypt.

This project allows users to create an account, securely store their password, log in, and access a protected profile page. JWT tokens are stored in cookies to maintain authentication, while bcrypt is used to hash passwords before saving them to MongoDB.

🚀 Features

- 👤 User Signup & Login
- 🔒 Secure password hashing with bcrypt
- 🎟️ JWT-based authentication
- 🍪 Cookie-based session authentication
- 🛡️ Protected profile route
- 🚪 Logout functionality
- 🗄️ MongoDB database integration
- 📄 EJS server-side rendering
- 🔐 Environment variables using dotenv

🛠️ Tech Stack

Node.js • Express.js • MongoDB • Mongoose • EJS • JWT • bcrypt • Cookie-parser • dotenv

⚙️ Setup

npm install
node app.js

Create a ".env" file:

JWT_SECRET=your_secret_key

Run the application at:

http://localhost:1000

👨‍💻 Author

Aryan Suratkar
B.Tech Information Technology Student