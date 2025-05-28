# Wish-Help Platform Setup Guide

This guide will help you set up the Wish-Help Platform development environment.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Redis (for caching)
- Git

## Project Structure

```
wish-help-platform/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Next.js pages
│   │   ├── styles/    # Global styles
│   │   └── utils/     # Utility functions
│   └── public/        # Static assets
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Custom middleware
│   │   └── utils/      # Utility functions
│   └── uploads/       # File uploads directory
└── docs/             # Project documentation
```

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/wish-help

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Redis Configuration
REDIS_URL=redis://localhost:6379

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880 # 5MB

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Payment Gateway Configuration
ALIPAY_APP_ID=your_alipay_app_id
ALIPAY_PRIVATE_KEY=your_alipay_private_key
WECHAT_PAY_APP_ID=your_wechat_pay_app_id
WECHAT_PAY_MCH_ID=your_wechat_pay_mch_id
WECHAT_PAY_API_KEY=your_wechat_pay_api_key
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_AUTH_CLIENT_ID=your_auth_client_id

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_tracking_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

1. Start MongoDB:
   ```bash
   mongod --dbpath /path/to/data/directory
   ```

2. Create the database:
   ```bash
   mongo
   use wish-help
   ```

## Redis Setup

1. Start Redis server:
   ```bash
   redis-server
   ```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment

1. Build the application:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)
- [Material-UI Documentation](https://mui.com/) 