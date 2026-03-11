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

- Responsive user interface
- Add Reviews
- Add authors
- Assign Books to a specific author
- The application supports uploading images such as book covers.
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

## How to Run the Project

To run the project locally, first clone the repository and navigate to the project folder. 
Start the backend by going to the `backend` directory and running `dotnet restore` followed by `dotnet run`. 
Then start the frontend by navigating to the `frontend` directory, running `npm install`, and then `npm run dev`.
The project uses **SQL Server with Entity Framework Core (Code-First)**, so you may need to run `dotnet ef database update` to create the database and apply migrations.



