<div align="center">

# 🎴 Lorricard Backend API

**A robust RESTful API backend for Lorricards - AI-powered flashcard generation system**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](https://opensource.org/licenses/ISC)
[![Groq AI](https://img.shields.io/badge/Groq-AI_Powered-FF6B6B?style=for-the-badge)](https://groq.com/)
[![Neon DB](https://img.shields.io/badge/Neon-Cloud_DB-00E699?style=for-the-badge)](https://neon.tech/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Lorricard Backend** is a high-performance RESTful API built to power the Lorricards platform. It leverages AI capabilities through Groq API to generate intelligent flashcards, manages user authentication via JWT, and provides seamless data persistence with PostgreSQL hosted on Neon DB.

This backend service handles:
- ✅ User authentication and authorization
- ✅ AI-powered flashcard generation
- ✅ Document processing (PDF, DOCX)
- ✅ Secure data management
- ✅ RESTful API endpoints

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure token-based authentication with refresh tokens |
| 🤖 **AI Integration** | Groq AI API for intelligent flashcard generation |
| 📄 **Document Processing** | Support for PDF and DOCX file uploads |
| 🍪 **Cookie Management** | Secure HTTP-only cookie handling |
| 🌐 **CORS Enabled** | Cross-origin resource sharing for frontend integration |
| 🗄️ **PostgreSQL** | Robust database with connection pooling |
| 🔒 **Password Hashing** | bcrypt encryption for user credentials |
| ☁️ **Cloud Hosted** | Neon DB for scalable cloud database |

---

## 🛠️ Tech Stack

### Core Technologies

<div align="center">

| Technology | Version | Purpose |
|:----------:|:-------:|:-------:|
| ![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white) | 20.x | Runtime Environment |
| ![Express.js](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white) | 5.1.0 | Web Framework |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Latest | Database |
| ![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | 9.0.2 | Authentication |

</div>

### Dependencies

```json
{
  "express": "^5.1.0",          // Web framework
  "pg": "^8.16.3",               // PostgreSQL client with Pool
  "jsonwebtoken": "^9.0.2",      // JWT authentication
  "bcryptjs": "^3.0.3",          // Password hashing
  "groq-sdk": "^0.37.0",         // Groq AI integration
  "cookie-parser": "^1.4.7",     // Cookie parsing middleware
  "cors": "^2.8.5",              // CORS middleware
  "dotenv": "^17.2.3",           // Environment variables
  "multer": "^2.0.2",            // File upload handling
  "pdf-parse": "^1.1.1",         // PDF document parsing
  "mammoth": "^1.11.0",          // DOCX document parsing
  "google-auth-library": "^10.5.0" // Google OAuth
}
```

### Development Dependencies

```json
{
  "nodemon": "^3.1.11"           // Development auto-reload
}
```

---

## 📁 Project Structure

```
lorricard_backend/
│
├── src/
│   ├── config/          # Configuration files (database, env)
│   ├── controller/      # Request handlers and business logic
│   ├── middleware/      # Custom middleware (auth, validation)
│   ├── models/          # Database models and queries
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions and utilities
│   └── server.js        # Application entry point
│
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Locked dependency versions
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-≥18.0.0-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-≥9.0.0-CB3837?style=flat-square&logo=npm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-≥14.0-4169E1?style=flat-square&logo=postgresql&logoColor=white)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jeremydanielestrada/lorricard_backend.git
   cd lorricard_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations** (if applicable)
   ```bash
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000` (or your configured port).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (Neon DB)
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_HOST=your-neon-host.neon.tech
POSTGRES_PORT=5432
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=lorricards_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Groq AI API
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=mixtral-8x7b-32768

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# CORS Configuration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret
```

⚠️ **Security Note**: Never commit your `.env` file to version control!

---

## 📚 API Documentation

### Base URL

```
Production: https://api.lorricards.com
Development: http://localhost:3000
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |
| `POST` | `/api/auth/refresh` | Refresh access token | ✅ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### Flashcard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/flashcards` | Get all flashcards | ✅ |
| `POST` | `/api/flashcards` | Create flashcard | ✅ |
| `GET` | `/api/flashcards/:id` | Get single flashcard | ✅ |
| `PUT` | `/api/flashcards/:id` | Update flashcard | ✅ |
| `DELETE` | `/api/flashcards/:id` | Delete flashcard | ✅ |
| `POST` | `/api/flashcards/generate` | AI generate flashcards | ✅ |

### Document Upload Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/upload/pdf` | Upload PDF document | ✅ |
| `POST` | `/api/upload/docx` | Upload DOCX document | ✅ |

### Example Request

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'

# Generate flashcards with AI
curl -X POST http://localhost:3000/api/flashcards/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "topic": "JavaScript Promises",
    "count": 5
  }'
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |
| `npm test` | Run test suite (to be implemented) |

### Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The server will auto-reload on file changes thanks to nodemon
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow ESLint configuration
- Use meaningful commit messages
- Write clean, documented code
- Add tests for new features

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Jeremy Daniel Estrada**

[![GitHub](https://img.shields.io/badge/GitHub-jeremydanielestrada-181717?style=flat-square&logo=github)](https://github.com/jeremydanielestrada)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source database
- [Neon](https://neon.tech/) - Serverless Postgres hosting
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [JWT](https://jwt.io/) - Secure authentication standard

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Jeremy Daniel Estrada](https://github.com/jeremydanielestrada)

![Visitors](https://img.shields.io/badge/Visitors-Welcome-brightgreen?style=for-the-badge)

</div>