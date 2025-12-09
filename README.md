# AssetVerse Client (Frontend)

**Full-stack Asset Management System - React Frontend**

A modern, responsive React application for managing company assets, employee requests, and team collaboration. Built with React 19, Vite, Tailwind CSS, and DaisyUI with Firebase Authentication and Cloudinary image uploads.

## 🚀 Live Demo

- **Client URL**: https://assestverse-clientside.web.app
- **Alternative**: https://assestverse-clientside.firebaseapp.com
- **API Backend**: https://assestverse-serverside.vercel.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Deployment](#deployment)
- [License](#license)

## ✨ Features

### Authentication
- 🔐 Firebase Authentication (Email/Password & Google)
- 👤 Separate registration for HR and Employees
- 🔄 Automatic role-based routing
- 🍪 Secure cookie-based sessions
- 🚪 Protected routes

### HR Manager Features
- 📊 Comprehensive dashboard with analytics
- 📦 Asset management (CRUD operations)
- 🔍 Advanced search, filter, and sort
- ✅ Request approval/rejection workflow
- 👥 Employee management
- 📈 Asset and request statistics
- 💳 Package upgrade system (Basic, Standard, Premium)
- 📷 Cloudinary image upload for assets
- 💰 Payment history tracking
- ♻️ Refund management

### Employee Features
- 📊 Personal dashboard
- 🛒 Browse and request assets
- 📋 View request history and status
- 📦 Track assigned assets
- 🔄 Return returnable assets
- 👥 View team members
- 🏢 Multi-company support

### UI/UX Features
- 🎨 Modern, clean interface with DaisyUI
- 📱 Fully responsive design
- 🌓 Light/Dark mode support
- 🎭 Smooth animations with Motion
- 📊 Interactive charts with ApexCharts
- 🗺️ Map integration with Leaflet
- 🔔 Toast notifications with SweetAlert2
- ⚡ Fast page loads with lazy loading

## 🛠️ Tech Stack

### Core
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool
- **React Router** 7.10.1 - Navigation

### Styling
- **Tailwind CSS** 4.1.17 - Utility-first CSS
- **DaisyUI** 5.5.8 - Component library
- **Motion** 12.23.25 - Animations

### State & Data
- **TanStack React Query** 5.90.12 - Server state management
- **Axios** 1.13.2 - HTTP client
- **React Hook Form** 7.68.0 - Form handling

### Charts & Maps
- **ApexCharts** 5.3.6 - Charts
- **React ApexCharts** 1.9.0 - React wrapper
- **Leaflet** 1.9.4 - Maps
- **React Leaflet** 5.0.0-rc.2 - React wrapper

### UI Components
- **React Icons** 5.5.0 - Icon library
- **SweetAlert2** 11.26.4 - Beautiful alerts
- **Swiper** 12.0.3 - Touch slider
- **date-fns** 4.1.0 - Date utilities

### Authentication
- **Firebase** 12.6.0 - Authentication & hosting

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=https://assestverse-serverside.vercel.app

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the application.

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or pnpm
- Firebase project
- Backend API running (see server README)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/assetverse-client.git
cd assetverse-client
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Start development server**
```bash
npm run dev
# or
pnpm run dev
```

Application will be running at `http://localhost:5173`

## 📁 Project Structure

```
assetverse-client/
├── public/                    # Static assets
│   ├── awards/               # Award images
│   └── trustedbrand/         # Brand logos
├── src/
│   ├── api/                  # API configuration
│   │   └── axiosInstance.js  # Axios setup with interceptors
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── home/             # Home page sections
│   │   └── shared/           # Shared components
│   ├── firebase/             # Firebase configuration
│   ├── hooks/                # Custom React hooks
│   │   └── useAuth.js        # Authentication hook
│   ├── layouts/              # Layout components
│   │   ├── MainLayout.jsx    # Public pages layout
│   │   └── DashboardLayout.jsx # Dashboard layout
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── NotFound.jsx      # 404 page
│   │   ├── auth/             # Authentication pages
│   │   ├── hr/               # HR manager pages
│   │   └── employee/         # Employee pages
│   ├── providers/            # Context providers
│   │   └── AuthProvider.jsx  # Auth context
│   ├── routes/               # Routing configuration
│   │   └── router.jsx        # React Router setup
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── firebase.json             # Firebase hosting config
├── .firebaserc               # Firebase project config
└── package.json              # Dependencies
```

## 👥 User Roles

### HR Manager
**Registration**: Requires company information and package selection
**Capabilities**:
- Manage company assets
- Approve/reject employee requests
- View and manage employees
- Upgrade subscription packages
- View analytics and reports

**Dashboard Access**: `/dashboard`
- Dashboard overview
- Asset list
- Add asset
- All requests
- My employees
- Profile
- Upgrade package

### Employee
**Registration**: Standard registration (no company required)
**Capabilities**:
- Browse available assets
- Request assets
- View assigned assets
- Return returnable assets
- View team members

**Dashboard Access**: `/dashboard`
- Dashboard overview
- Request asset
- My assets
- My team
- Profile

## 🚀 Deployment

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase** (first time only)
```bash
firebase init hosting
```
- Select: Use existing project
- Choose your Firebase project
- Public directory: **dist**
- Single-page app: **Yes**
- Overwrite index.html: **No**

4. **Build production bundle**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy --only hosting
```

### Post-Deployment

1. **Update Server CORS**
   - Add Firebase URLs to server's `CLIENT_ORIGIN`:
   ```
   https://your-app.web.app,https://your-app.firebaseapp.com,http://localhost:5173
   ```

2. **Update Firebase Auth Domains**
   - Firebase Console → Authentication → Settings → Authorized domains
   - Add your Vercel server domain

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🎨 Features Breakdown

### Home Page
- Hero section with animations
- Features showcase
- How it works section
- Pricing packages
- Testimonials
- FAQ section
- Trusted brands
- Call-to-action section

### Authentication
- Email/Password registration & login
- Google Sign-In
- Separate HR and Employee registration
- Profile image upload
- Date of birth picker
- Form validation

### HR Dashboard
- Asset statistics
- Request statistics
- Recent requests
- Charts (Asset distribution, Request trends)
- Quick actions

### Employee Dashboard
- Asset statistics
- Request status
- Assigned assets
- Team information
- Quick request action

### Asset Management (HR)
- Grid and table view
- Advanced filters (type, category, status)
- Search functionality
- Sorting options
- Direct employee assignment
- Image upload
- CRUD operations

### Request Management
- Real-time status updates
- Filter by status
- Approve/reject actions
- Request details
- Notes and messages

### Package System
- Basic (5 employees) - Free
- Standard (10 employees) - $8
- Premium (20 employees) - $15
- Stripe payment integration
- Payment history
- Refund system

## 🔒 Security Features

- ✅ Protected routes
- ✅ Role-based access control
- ✅ Secure HTTP-only cookies
- ✅ Firebase Authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ XSS prevention

## 🐛 Troubleshooting

### CORS Errors
- Verify `VITE_API_URL` in `.env`
- Ensure server has your client URLs in `CLIENT_ORIGIN`

### Firebase Auth Not Working
- Check all `VITE_FIREBASE_*` variables are set
- Verify Firebase Console settings
- Check authorized domains

### Build Fails
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check for TypeScript/ESLint errors

### Images Not Loading
- Check Cloudinary credentials on server
- Verify image URLs are accessible
- Check CORS settings for images

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 👨‍💻 Author

**Abbas Yasin**
- GitHub: [@abbasyasin1n2](https://github.com/abbasyasin1n2)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite for blazing fast build tool
- Firebase for authentication & hosting
- Tailwind CSS & DaisyUI for beautiful UI
- All open-source contributors

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
