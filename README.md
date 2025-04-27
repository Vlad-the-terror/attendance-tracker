# Attendance Tracker

A modern web application for tracking student attendance with separate login panels for students, teachers, and administrators.

## Features

- Dark theme UI built with Next.js, TypeScript, and TailwindCSS
- Role-based authentication (Student, Teacher, Admin)
- Responsive design that works on all devices
- Modern UI components using Shadcn UI

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/attendance-tracker.git
cd attendance-tracker
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploying to Vercel

The easiest way to deploy this application is through Vercel, which is optimized for Next.js projects.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Visit [Vercel](https://vercel.com) and sign up/log in

3. Click "New Project" and import your repository

4. Vercel will automatically detect it as a Next.js project
   - No configuration changes are needed
   - The project includes a `vercel.json` file with optimal settings

5. Click "Deploy"

6. Once deployed, you can assign a custom domain through the Vercel dashboard

### Demo Credentials

For testing purposes, use these credentials:

- **Student**: student@example.com / password123
- **Teacher**: teacher@example.com / password123
- **Admin**: admin@example.com / password123

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and helpers

## Technologies Used

- Next.js 14
- TypeScript
- TailwindCSS
- Shadcn UI
- Radix UI

## License

This project is licensed under the MIT License - see the LICENSE file for details. 