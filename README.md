# Pomegrenade - A Lightweight Calorie Counter With A Bang 

- **Live Demo**: https://pomegrenade.xyz/

---

## 🚀 Introduction

**Pomegrenade** is a full-stack (MERN) calorie tracking application that helps users monitor their nutritional intake. 

**Features:**

- 🔐 Secure user authentication system (using JWT)
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
- [FatSecret API](https://platform.fatsecret.com/platform-api) credentials (for nutritional database) 
- [Brevo](https://www.brevo.com/free-smtp-server/) or alternative SMTP provider (for email notifications)
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
### Environment Setup ###

Create **.env** files in both client and server directories:

**Client (.env):**
```bash
VITE_BACKEND_URL="http://localhost:4000"
```

**Server (.env):**
```bash
PORT=4000
MONGODB_URI={your_mongodb__uri}
JWT_SECRET={your_jwt_secret}
NODE_ENV="development"

SMTP_USER={your_smtp_user}
SMTP_PASS={your_smtp_password}

SENDER_EMAIL={your_smtp_sender_email}

FATSECRET_CLIENT_ID={your_fatsecret_client_id}
FATSECRET_CLIENT_SECRET={your_fatsecret_client_secret}
```

Running the Application
```bash
# Run server (from server directory)
npm run dev

# Run client (from client directory)
npm run dev
```
Access the app at: http://localhost:{port}

Where {port} is the dynamic port provided by Vite (typically 5173, visible in terminal when running npm run dev).

## 🛠️ Technology Stack

### Frontend (Client): ###

| Category          | Technologies       |
| ----------------  | ------------------ |
| Core              | React 18 + Vite    |
| Core              | TypeScript         |
| Styling           | Tailwind CSS       |
| Component library | ShadCN             |
| Forms             | React Hook Form    |
| Recharts          | Charts             |
| Notifications     | Toastify           |
| API Requests      | Axios              |
| Animations        | (Framer) Motion    |

### Backend (Server): ###

| Category          | Technologies       |
| ----------------  | ------------------ |
| Runtime           | Node.js            |
| Node.js framework | Express            |
| Database          | MongoDB            |
| ODM for MongoDB   | Mongoose           |
| JWT               | Authentication     |
| Nodemailer        | Email services     |
| Notifications     | Toastify           |
| API Requests      | Axios              |
| Animations        | (Framer) Motion    |

## 📫 Contact

- **Email**: zsolt.nagy998@gmail.com
