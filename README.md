# IBook 📚

IBook is a full-stack web application that allows users to explore books, manage their reading list, and interact with their personal library. The platform includes secure authentication, wishlist management, and a modern responsive interface.

---

## Features

- User Registration and Login
- JWT-based Authentication
- Forgot Password and Reset Password via Email (SMTP)
- Browse books and view details
- Add books to Wishlist
- Mark books as Read
- Upload book cover images
- Responsive user interface
- Add Reviews
- Add authors
- Assign Books to a specific author
---

## Tech Stack

### Frontend
- React
- React Query
- Axios
- Ant Design
- React Router

### Backend
- ASP.NET Core Web API
- ASP.NET Identity
- JWT Authentication
- SMTP Email Service

### Database
- SQL Server
- Entity Framework Core

---

## Authentication

The application uses **ASP.NET Identity** for managing users and **JWT tokens** for authentication.

After a successful login:
- The backend generates a JWT token
- The token contains user claims such as user ID and email
- The frontend stores the token and sends it with protected API requests

---

## Password Reset

The password recovery system works as follows:

1. The user requests a password reset.
2. The backend generates a password reset token using ASP.NET Identity.
3. A reset link containing the token is sent via SMTP email.
4. The user can reset their password through the provided link.

---

## File Upload

The application supports uploading images such as book covers.

- Files are uploaded through the API.
- They are stored inside the server's `wwwroot` directory.
- A public URL is generated and returned to the frontend.

---


