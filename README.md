# GiftLink

## Project Overview

GiftLink is a full-stack web application that connects users who want to give away household items they no longer need with people who enjoy recycling and prefer finding free items instead of purchasing new ones.

The platform promotes sustainability and community sharing by making it easy for users to list, search, and request household goods.

---

## Features

The GiftLink application includes:

- Home page
- Landing page
- Navigation bar
- Search functionality
- Gift/item listing page
- Item details page
- User registration
- User login
- Editable user profile
- Comments and sentiment analysis
- Secure authentication using JWT

---

## Technologies Used

### Frontend
- React
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Tokens (JWT)
- Password hashing
- Middleware validation

### DevOps & Deployment
- Docker
- GitHub Actions
- Kubernetes
- IBM Code Engine

---

## Project Architecture

GiftLink follows a full-stack architecture:

- React frontend client
- Express/Node.js backend API
- MongoDB database for persistent storage

The application uses REST APIs to communicate between the frontend and backend services.

---

## Project Structure

```bash
giftproject/
│
├── giftlink-backend/
│   ├── models/
│   ├── routes/
│   ├── util/
│   └── package.json
│
├── giftlink-frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── sentiment/
├── README.md
