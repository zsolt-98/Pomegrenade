# Pomegrenade - A Lightweight Calorie Counter With A Bang 

- **Live Demo**: [https://pomegrenade-xyz/]

---

## 🚀 Introduction

**Pomegrenade** is a full-stack calorie tracking application that helps users monitor their nutritional intake. 

**Features:**

- 🔐 Secure user authentication system (JWT)
- 📊 Comprehensive nutrition dashboard
- 🍎 Food diary with search functionality
- 🥗 Customizable weight and macronutrient goals
- 👤 Personalized user profiles (profile image, name, email)
- 🔑 Self-service password reset functionality
- 📱 Fully responsive design

---

## 📦 Getting Started
**Prerequisites:**
- Node.js (v20.17.0)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pomegrenade.git
cd pomegrenade

# Install dependencies for both client and server
cd client && npm install
cd ../server && npm install
```

Access the app at: http://localhost:{port}

Where {port} is the dynamic port provided by Vite (typically 5173, visible in terminal when running npm run dev).

⚠️ Important: This is frontend-only - no backend required!

## 🔍 Core Features

### User Authentication Flow

- Form validation with Formik/Yup
- Mock user session
- Protected routes using React Router

### Booking Flow

- Vehicle selection
- Date/time/location scheduling
- Booking summary preview

### Profile Management

- Update personal information (username, email, first name)
- Password reset functionality
- View/cancel active bookings

## 🛠️ Technology Stack

| Category         | Technologies       |
| ---------------- | ------------------ |
| Core Framework   | React 18 + Vite    |
| State Management | Zustand            |
| Routing          | React Router v6    |
| Styling          | Bootstrap 5 + Sass |
| Forms            | Formik + Yup       |
| Notifications    | React Hot Toast    |

## ⚠️ Current Limitations

- **Security**: localStorage used for mock user authentication (may trigger browser password manager warnings. These can safely be ignored)

## 🌟 Future Roadmap

- Backend API integration
- Admin dashboard

## 📫 Contact

- **Email**: [zsolt.nagy998@gmail.com]
