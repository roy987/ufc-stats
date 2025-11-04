# UFC Fighter Stats Web App

A full-stack web application for viewing UFC fighter statistics, records, and fight history. Built with Next.js (frontend) and Node.js/Express (backend) using TypeScript.

## Features

- View all UFC fighters with their basic stats
- Click on any fighter to see detailed information including:
  - Full fight record
  - Physical attributes (height, reach, stance)
  - Current form rating (1-10 scale)
  - Fighting statistics (striking, takedowns, submissions)
  - Recent fight history with results
- Responsive design with Tailwind CSS
- Dark theme optimized for viewing

## Project Structure

```
AIProject/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── data/        # Fighter data
│   │   ├── models/      # TypeScript interfaces
│   │   ├── routes/      # API routes
│   │   └── index.ts     # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/            # Next.js app
│   ├── app/
│   │   ├── fighters/   # Fighter detail pages
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx    # Home page
│   ├── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- CORS for cross-origin requests

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router

## Getting Started

### Prerequisites
- Node.js (v20.5.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository (if not already done):
```bash
git clone <your-repo-url>
cd AIProject
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

You'll need to run both the backend and frontend servers:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
The backend API will start on [http://localhost:5000](http://localhost:5000)

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```
The frontend will start on [http://localhost:3000](http://localhost:3000)

### Building for Production

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

## API Endpoints

### Get All Fighters
```
GET http://localhost:5000/api/fighters
```

### Get Fighter by ID
```
GET http://localhost:5000/api/fighters/:id
```

### Get Fighters by Weight Class
```
GET http://localhost:5000/api/fighters/weight-class/:weightClass
```

### Health Check
```
GET http://localhost:5000/api/health
```

## Sample Data

The app comes with 6 pre-loaded UFC fighters:
- Islam Makhachev (Lightweight)
- Alex Pereira (Light Heavyweight)
- Sean O'Malley (Bantamweight)
- Jon Jones (Heavyweight)
- Ilia Topuria (Featherweight)
- Leon Edwards (Welterweight)

## Future Enhancements

Potential features to add:
- Search functionality
- Filter by weight class
- Sort by various metrics
- Add/edit/delete fighters (CRUD operations)
- Fighter comparison tool
- Real-time data from UFC API
- Authentication and user accounts
- Favorite fighters list
- Fight predictions based on stats

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

ISC
