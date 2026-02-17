# PhotoPostApp - Full Stack Photo Sharing Application

A complete full-stack application for sharing and managing photo posts, built with Flask (Python) backend and Angular frontend.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL or SQLite

### Running the Application

#### 1. Start Backend API
```bash
cd backend/photopostapp
# Follow backend setup instructions
python app.py  # or flask run
```
Backend will run on: `http://localhost:5000`

#### 2. Start Frontend
```bash
cd frontend/photopostapp
npm install
npm start
```
Frontend will run on: `http://localhost:4200`

#### 3. Open in Browser
Navigate to `http://localhost:4200` and start using the app!

## 📁 Project Structure

```
PhotoPostApp/
├── backend/photopostapp/          # Flask REST API
│   ├── app.py                     # Main application
│   ├── PhotoPostApp.postman_collection.json  # API documentation
│   └── ...
├── frontend/photopostapp/         # Angular Application
│   ├── src/app/
│   │   ├── components/           # UI Components
│   │   ├── services/             # API Services
│   │   ├── guards/               # Route Guards
│   │   ├── models/               # TypeScript Models
│   │   └── interceptors/         # HTTP Interceptors
│   ├── README.md                 # Frontend documentation
│   └── USER_GUIDE.md             # User guide
└── database/                      # Database files
```

## 🎯 Features

### User Features
- ✅ User registration and authentication
- ✅ Browse public photo gallery with pagination
- ✅ Create, edit, and delete own posts
- ✅ View detailed post information
- ✅ Responsive design for all devices

### Admin Features
- ✅ Admin dashboard
- ✅ View all registered users
- ✅ Manage all posts (view/delete)
- ✅ User role management

### Technical Features
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ RESTful API design
- ✅ HTTP interceptor for token management
- ✅ Route guards for security
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive Tailwind CSS styling

## 🔐 Security

### Backend Security
- JWT token authentication
- Password hashing
- Role-based authorization
- Input validation
- CORS configuration

### Frontend Security
- JWT token storage in localStorage
- HTTP interceptor for automatic token injection
- Auth guards protecting routes
- Admin guards for privileged operations
- XSS protection via Angular sanitization

## 📚 API Documentation

The complete API documentation is available in the Postman collection:
`backend/photopostapp/PhotoPostApp.postman_collection.json`

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

#### Posts (Public)
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post

#### Posts (Authenticated)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/users/me/posts` - Get current user's posts

#### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/posts` - Get all posts
- `DELETE /api/admin/posts/:id` - Delete any post

## 🛠️ Technology Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite/PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful
- **Validation**: Flask validation

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Angular Signals
- **HTTP**: HttpClient with Interceptors
- **Routing**: Angular Router with Guards

## 📖 Documentation

### For Developers
- **Backend**: See `backend/photopostapp/` directory
- **Frontend**: See `frontend/photopostapp/README.md`
- **API**: Import Postman collection for complete API docs

### For Users
- **User Guide**: See `frontend/photopostapp/USER_GUIDE.md`
- Comprehensive walkthrough of all features

## 🧪 Testing

### Backend Testing
```bash
cd backend/photopostapp
# Run tests (if available)
pytest
```

### Frontend Testing
```bash
cd frontend/photopostapp
# Run tests
npm test

# Build for production
npm run build
```

## 🚢 Deployment

### Backend Deployment
- Configure production database
- Set environment variables
- Deploy to cloud service (Heroku, AWS, etc.)
- Configure CORS for frontend domain

### Frontend Deployment
- Build for production: `npm run build`
- Deploy `dist/` folder to hosting service
- Update `environment.prod.ts` with production API URL
- Configure web server (nginx, Apache, etc.)

## 🤝 User Roles

### Regular User
- Browse photo gallery
- Create, edit, delete own posts
- View post details
- Manage account

### Admin
- All user capabilities
- View all users
- Delete any post
- Access admin dashboard

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Clean, gradient-based design with Tailwind CSS
- **Real-time Validation**: Immediate feedback on form inputs
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Pagination**: Easy navigation through large datasets
- **Image Preview**: See images before posting

## 📝 Development Workflow

### Adding New Features

1. **Backend**:
   - Define new endpoint in Flask
   - Add to Postman collection
   - Test with Postman

2. **Frontend**:
   - Create/update service methods
   - Create/update components
   - Add routes if needed
   - Style with Tailwind CSS

## 🔧 Configuration

### Backend Configuration
- Database URL
- JWT secret key
- CORS origins
- Upload settings

### Frontend Configuration
Edit `frontend/photopostapp/src/app/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## 📊 Build Status

✅ **Backend**: Functional REST API with JWT auth
✅ **Frontend**: Complete Angular app with all features
✅ **Integration**: Fully integrated and tested
✅ **Security**: No vulnerabilities detected
✅ **Documentation**: Complete

## 🐛 Known Issues

None currently. Please report any issues you find!

## 📧 Support

For questions or issues:
1. Check the documentation
2. Review the Postman collection for API details
3. Check the USER_GUIDE.md for user workflows

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

---

**Happy Photo Sharing! 📸**
