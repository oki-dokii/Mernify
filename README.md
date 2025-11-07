# 🌊 FlowSpace - Your Team's Visual Workspace

> **Collaborate visually, write freely.** A beautiful, real-time Kanban board that brings your team together.

FlowSpace is a modern project management tool that combines the simplicity of Kanban boards with the power of real-time collaboration. Built for teams who want to stay in sync without the complexity.

![FlowSpace Banner](https://img.shields.io/badge/FlowSpace-Kanban-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🎯 What is FlowSpace?

FlowSpace is where your team's work comes together. It's a real-time Kanban board that lets you:

- **Visualize your workflow** with beautiful, glassy cards
- **Collaborate instantly** with your team in real-time
- **Track who's doing what** with user avatars on every card
- **Take rich notes** with a Google Docs-like editor
- **Invite teammates** with secure, shareable links
- **Stay organized** with boards, columns, and tags

Whether you're managing a software project, planning content, or organizing tasks, FlowSpace keeps everyone on the same page.

---

## ✨ Features

### 🎨 **Beautiful Kanban Boards**
- Futuristic, glassy card design with smooth animations
- Drag-and-drop cards between columns
- Square cards with 2x2 grid layout for optimal information display
- Customizable columns (To Do, In Progress, Review, Done)
- Color-coded tags for quick categorization

### 👥 **Real-Time Collaboration**
- See changes instantly as your team works
- Live cursor presence in shared notes
- User avatars on every card showing who created/edited it
- Real-time activity feed tracking all team actions
- Socket.io powered synchronization (< 1 second latency)

### 🔐 **Secure Team Management**
- Firebase authentication for secure sign-in/sign-up
- Invite teammates via email or shareable links
- Role-based permissions (Owner, Editor, Viewer)
- 7-day expiring invite links for security
- Board-level access control

### 📝 **Rich Text Notes**
- Google Docs-like editor for shared notes
- **9 font families** (Sans-serif, Serif, Monospace, Arial, Comic Sans, Courier New, Georgia, Helvetica, Lucida)
- **6 heading levels** (H1-H6)
- **Text & background colors** with full color picker
- Formatting: Bold, Italic, Underline, Strikethrough
- Lists: Ordered, Bullet, Checklist
- Alignment: Left, Center, Right, Justify
- Insert: Links, Images, Videos, Code blocks, Blockquotes
- Real-time sync across all users

### 📊 **Activity Tracking**
- Complete activity feed of all board actions
- User avatars next to each activity
- Track card creation, updates, and deletions
- See who did what and when
- Time-stamped entries (e.g., "5 minutes ago")

### 🎯 **Smart Cards**
- Title, description, tags, and due dates
- User attribution (creator and last editor)
- Auto-generated avatars if no custom avatar set
- Square layout with 4 sections:
  - Top Left: Title
  - Top Right: Tags & Edit button
  - Bottom Left: Description
  - Bottom Right: Date & User avatar

### 🌓 **Dark Mode Ready**
- Beautiful dark gradient backgrounds
- Glass-morphism design throughout
- Custom scrollbar styling
- Smooth animations and transitions

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Firebase Account** (for authentication)
- **Gmail Account** (for SMTP email invites - optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flowspace.git
   cd flowspace
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB
   MONGO_URL=mongodb://localhost:27017/flowspace
   
   # JWT Secrets
   JWT_ACCESS_SECRET=your_access_secret_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   
   # SMTP (Optional - for email invites)
   SMTP_EMAIL=your.email@gmail.com
   SMTP_PASSWORD=your_app_password
   
   # URLs
   FRONTEND_URL=http://localhost:3000
   APP_URL=http://localhost:3000
   PORT=3000
   ```

4. **Configure Firebase**
   
   Create `/app/client/lib/firebase.ts` with your Firebase config:
   ```javascript
   import { initializeApp } from 'firebase/auth';
   
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     // ... other config
   };
   
   export const app = initializeApp(firebaseConfig);
   ```

5. **Start the development servers**
   
   ```bash
   # Start backend (port 8001)
   cd server
   yarn dev
   
   # In another terminal, start frontend (port 3000)
   cd client
   yarn dev
   ```

6. **Open your browser**
   ```
   Navigate to: http://localhost:3000
   ```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **React Quill** - Rich text editor
- **DnD Kit** - Drag and drop functionality

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Socket.io** - Real-time WebSocket server
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email sending (SMTP)

### Authentication & Services
- **Firebase Auth** - User authentication
- **Gmail SMTP** - Email invitations
- **Dicebear API** - Auto-generated avatars

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite** - Fast HMR and building
- **Supervisor** - Process management

---

## 📂 Project Structure

```
flowspace/
├── client/                  # React frontend
│   ├── components/         # Reusable UI components
│   │   ├── kanban/        # Kanban board components
│   │   ├── notes/         # Notes panel components
│   │   ├── ui/            # Base UI components (shadcn)
│   │   └── theme/         # Theme provider
│   ├── contexts/          # React contexts (Auth, Board)
│   ├── lib/               # Utilities (API, Socket.io, Firebase)
│   ├── pages/             # Main application pages
│   ├── hooks/             # Custom React hooks
│   └── App.tsx            # Root component
│
├── server/                 # Node.js backend
│   ├── controllers/       # Request handlers
│   │   ├── authController.ts
│   │   ├── boardsController.ts
│   │   ├── cardsController.ts
│   │   ├── inviteController.ts
│   │   └── activityController.ts
│   ├── models/            # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Board.ts
│   │   ├── Card.ts
│   │   ├── Invite.ts
│   │   └── Activity.ts
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware (auth)
│   ├── socket.ts          # Socket.io setup
│   └── index.ts           # Server entry point
│
├── .env                    # Environment variables
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🎮 Usage Guide

### Creating Your First Board

1. **Sign up** with your email and password
2. Click **"Create Board"** from the homepage
3. Enter a board name and description
4. Your board is created with default columns!

### Adding Cards

1. Click **"Add Card"** in any column
2. Enter the card details:
   - Title (required)
   - Description (optional)
   - Tags (optional)
   - Due date (optional)
3. Click **"Save"**
4. Your avatar appears on the card automatically!

### Inviting Team Members

1. Go to **Invite** page from navigation
2. Select the board you want to share
3. Enter teammate's email
4. Choose their role (Editor or Viewer)
5. Click **"Send Invite"**
6. Share the generated link or they'll receive an email!

### Collaborating in Real-Time

1. Open the board with your team
2. Watch as cards update instantly when teammates make changes
3. See user avatars on cards showing who created/edited them
4. Check the **Activity** feed to see all recent actions
5. Use **Shared Notes** for collaborative writing

### Using Rich Text Notes

1. Open the **Shared Notes** panel on any board
2. Use the toolbar to format text:
   - Change fonts, sizes, and colors
   - Add headings (H1-H6)
   - Insert lists, links, images
   - Format with bold, italic, underline
3. Changes sync in real-time to all team members!

---

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URL` | MongoDB connection string | ✅ Yes | - |
| `JWT_ACCESS_SECRET` | Secret for access tokens | ✅ Yes | - |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | ✅ Yes | - |
| `SMTP_EMAIL` | Gmail address for invites | ❌ No | - |
| `SMTP_PASSWORD` | Gmail app password | ❌ No | - |
| `FRONTEND_URL` | Frontend base URL | ❌ No | `http://localhost:3000` |
| `APP_URL` | Application base URL | ❌ No | `http://localhost:3000` |
| `PORT` | Frontend port | ❌ No | `3000` |

---

## 🚢 Deployment

### Deploy to Production

1. **Build the application**
   ```bash
   yarn build
   ```

2. **Set production environment variables**
   - Update Firebase config with production domain
   - Set MongoDB connection to production database
   - Configure SMTP with production credentials
   - Ensure JWT secrets are secure

3. **Deploy backend**
   - The backend runs on Node.js
   - Ensure Socket.io is configured for your domain
   - Set proper CORS origins

4. **Deploy frontend**
   - Built files are in `dist/` directory
   - Configure your CDN or hosting service
   - Ensure API calls use relative URLs (already configured)

5. **Important Notes**
   - Invite links automatically use your production domain
   - Real-time features work across all deployments
   - Firebase must be configured for your production domain

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 API Documentation

### Authentication Endpoints

```
POST /api/auth/firebase-login    # Exchange Firebase token for JWT
POST /api/auth/logout            # Logout user
GET  /api/auth/refresh           # Refresh access token
```

### Board Endpoints

```
GET    /api/boards               # List user's boards
POST   /api/boards               # Create new board
GET    /api/boards/:id           # Get board details
PUT    /api/boards/:id           # Update board
DELETE /api/boards/:id           # Delete board
```

### Card Endpoints

```
GET    /api/cards/:boardId/cards # List cards in board
POST   /api/cards/:boardId/cards # Create new card
PUT    /api/cards/:id            # Update card
DELETE /api/cards/:id            # Delete card
```

### Invite Endpoints

```
POST /api/invite                 # Send invite
POST /api/invite/:token/accept   # Accept invite
GET  /api/invite/board/:boardId  # List board invites
```

### Activity Endpoints

```
GET /api/activity                # List recent activities
```

---

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start**
- Check if port 3000 is available
- Run `yarn install` to ensure dependencies are installed
- Clear node_modules and reinstall if needed

**Backend connection errors**
- Verify MongoDB is running
- Check MONGO_URL in .env file
- Ensure backend is running on port 8001

**Socket.io not connecting**
- Check CORS configuration
- Verify Socket.io server is running
- Check browser console for connection errors

**Invite emails not sending**
- Verify SMTP credentials in .env
- Use Gmail app password (not regular password)
- Check SMTP logs in backend console

**Cards show "Unknown user"**
- Ensure you're logged in
- Backend should populate user data automatically
- Check browser localStorage for auth token

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Shadcn UI** for beautiful component designs
- **Dicebear** for avatar generation
- **React Query** for excellent server state management
- **Socket.io** for reliable real-time communication

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/flowspace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/flowspace/discussions)
- **Email**: support@flowspace.dev

---

## 🎉 Get Started Today!

Ready to bring your team together? Clone the repo and start collaborating in minutes!

```bash
git clone https://github.com/yourusername/flowspace.git
cd flowspace
yarn install
# Configure .env
yarn dev
```

**Happy collaborating! 🚀**

---

<div align="center">
  
Made with ❤️ by the FlowSpace Team

[⭐ Star us on GitHub](https://github.com/yourusername/flowspace)

</div>
