# Wish-Help Platform

A comprehensive platform connecting people who need help with those who can provide assistance.

## Project Structure

```
wish-help-platform/
├── frontend/           # React/Next.js frontend application
├── backend/           # Node.js/Express backend API
└── docs/             # Project documentation
```

## Features

### For Wish Makers
- Wish creation and management
- Privacy controls
- Payment escrow system
- Rating and feedback system
- Social features and community building

### For Helpers
- Task discovery and management
- Skill showcase
- Reputation system
- Service tools and resources
- Training and certification

### Platform Management
- Content moderation
- Dispute resolution
- Analytics and reporting
- Community management

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Redis (for caching)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/wish-help
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

## Contributing

Please read our contributing guidelines in the `docs/CONTRIBUTING.md` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 