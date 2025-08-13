# Honcho Campout Schedule

A responsive schedule viewer for the Honcho Campout 2025 event, built with React and Vite.

## Features

- **Responsive Design**: Mobile-first design with swipeable stage views and desktop grid layout
- **Event Details**: Comprehensive event information with descriptions and tags
- **Color-coded Events**: Visual distinction between different event types
- **Modular Components**: Clean, maintainable component architecture

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with title and legend
│   ├── Mobile.jsx          # Mobile schedule view
│   ├── Desktop.jsx         # Desktop schedule view
│   └── Details.jsx         # Event details section
├── data.json               # Event data
├── HonchoCampoutSchedule.jsx # Main component
├── main.jsx                # Application entry point
└── index.css               # Global styles with Tailwind
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing
