# Finance Flow

A full-stack personal finance management application built with React, TypeScript, and Node.js. Finance Flow helps users manage their finances by tracking income and expenses with an intuitive and modern interface.

## Features

- Track income and expenses
- Categorize transactions
- View financial reports and summaries
- Modern and responsive UI built with Material-UI and Tailwind CSS
- Secure backend API with Express and TypeORM
- SQLite database for easy setup and portability

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (usually comes with Node.js)
- Git

## Installation

### Clone the Repository

```bash
git clone https://github.com/PierrunoYT/financeflow.git
cd budget-tracker
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
# For Windows
copy .env.example .env

# For macOS/Linux
cp .env.example .env
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

The backend server will start on http://localhost:3000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
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

The frontend application will start on http://localhost:5173

## Operating System Specific Notes

### Windows

- Use PowerShell or Command Prompt for running commands
- If you encounter permission issues, run PowerShell as Administrator
- Make sure you have the necessary build tools:
```bash
npm install --global --production windows-build-tools
```

### macOS

- Use Terminal.app or iTerm2
- If you encounter permission issues:
```bash
sudo chown -R $USER /usr/local/lib/node_modules
```
- You might need to install Xcode Command Line Tools:
```bash
xcode-select --install
```

### Linux

- Most distributions will work out of the box
- If you encounter permission issues:
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```
- Install build essentials if needed:
```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# Fedora
sudo dnf groupinstall "Development Tools"

# Arch Linux
sudo pacman -S base-devel
```

## Development

- Backend runs on port 3000
- Frontend runs on port 5173
- SQLite database file is created automatically in the backend directory

## Scripts

### Backend

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build TypeScript code
- `npm start`: Start production server

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Troubleshooting

1. Port already in use:
   - Windows: `netstat -ano | findstr :<port>`
   - macOS/Linux: `lsof -i :<port>`

2. Node modules issues:
   - Delete node_modules folder and package-lock.json
   - Run `npm install` again

3. Database issues:
   - Delete the SQLite database file
   - Restart the backend server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 