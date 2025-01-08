# CureNest - Healthcare Management System

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

🌐 Live Demo
Access CureNest at: https://curenest.vercel.app

## 🏥 About CureNest

CureNest is a comprehensive healthcare management system designed to streamline patient care and hospital management. Our platform integrates various healthcare services and features to provide a seamless experience for both patients and healthcare providers.

## ✨ Key Features

### 🗺️ Nearby Hospital Locator
- Interactive map interface powered by Mapbox
- Real-time hospital location tracking
- Detailed hospital information including facilities, specialties, and contact details
- Distance calculation and routing capabilities
- Filter hospitals based on specialties and available services

### 👤 User Authentication & Health Data Management
- Secure user registration and login system
- Firebase Authentication integration
- Role-based access control (Patients, Doctors,HealthOrgs, Administrators)
- Encrypted personal health information storage

### 📅 Appointment Scheduling System
- Real-time appointment booking
- Calendar integration
- Doctor availability tracking

## 🛠️ Technical Stack

### Frontend
- React.js
- ShadCN - UI 
- Mapbox GL JS
- Redux for state management
- Axios for API handling

### Backend
- Node.js
- Express.js
- PostgreSql
- Firebase Authentication
- JWT for session management

### APIs and Services
- Mapbox API for location services
- Firebase Authentication API
- Custom REST APIs for healthcare data management
- WebSocket for real-time updates

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/curenest.git
cd curenest
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
MAPBOX_API_KEY=your_mapbox_api_key
FIREBASE_CONFIG=your_firebase_config

# Frontend .env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

4. Start the application
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start
```

## 🔒 Security Features

- End-to-end encryption for sensitive health data
- HIPAA compliance measures
- Regular security audits


## 👥 Team

- Project Lead: Roshni Dholariya
- Backend Developer: Kshitij Oza (Full Stack Developer)
- Frontend Developer: Roshni Dholariya (Full Stack Developer), Saloni Gadhiya(Full Stack Developer)
- UI/UX Designer: Roshni Dholariya (Full Stack Developer), Saloni Gadhiya(Full Stack Developer)

## 📞 Support

For support, please email support@curenest.com or join our Slack channel.

---

⭐ Star us on GitHub — it motivates us to make CureNest even better!
