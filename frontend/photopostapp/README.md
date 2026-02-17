# PhotoPostApp - Angular Frontend

A modern Angular frontend application for managing photo posts with user authentication and admin functionalities.

## Features

- **User Authentication**: Registration and login with JWT token management
- **Photo Gallery**: Browse public photo posts with pagination
- **User Posts Management**: Create, edit, and delete your own posts
- **Admin Dashboard**: Manage all users and posts (admin only)
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **Route Protection**: Auth guards for secure routes
- **Real-time Updates**: Reactive UI using Angular signals

## Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:5000

## Installation

```bash
cd frontend/photopostapp
npm install
```

## Development Server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project for production:

```bash
npm run build
# or
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Project Structure

```
src/app/
├── components/          # UI components
│   ├── navbar/         # Navigation header
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── home/           # Public gallery
│   ├── post-detail/    # Individual post view
│   ├── my-posts/       # User's posts management
│   ├── post-form/      # Create/edit post form
│   └── admin/          # Admin dashboard
├── services/           # API services
│   ├── auth.service.ts     # Authentication
│   ├── post.service.ts     # Post operations
│   └── admin.service.ts    # Admin operations
├── guards/             # Route guards
│   ├── auth.guard.ts   # Authentication guard
│   └── admin.guard.ts  # Admin role guard
├── interceptors/       # HTTP interceptors
│   └── auth.interceptor.ts # JWT token injection
├── models/            # TypeScript interfaces
│   ├── user.model.ts  # User types
│   └── post.model.ts  # Post types
└── environments/      # Environment configs
    ├── environment.ts
    └── environment.prod.ts
```

## API Endpoints

The application consumes the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Posts (Public)
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post

### Posts (Authenticated)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/users/me/posts` - Get current user's posts

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/posts` - Get all posts (admin view)
- `DELETE /api/admin/posts/:id` - Delete any post

## User Roles

### Regular User
- Browse public photo gallery
- Create, edit, and delete own posts
- View post details

### Admin
- All user capabilities
- View all users in the system
- Delete any post
- Access admin dashboard

## Configuration

Update the API base URL in `src/app/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // Update this for your backend
};
```

## Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in localStorage
- HTTP interceptor automatically adds tokens to API requests
- Auth guards protect authenticated routes
- Admin guard restricts admin-only routes

## Styling

The application uses Tailwind CSS v4 for styling:
- Responsive design patterns
- Custom gradient themes
- Modern UI components
- Accessible form controls

## Technologies

- **Angular 21** - Framework
- **TypeScript** - Language
- **Tailwind CSS 4** - Styling
- **RxJS** - Reactive programming
- **Angular Signals** - State management
- **HttpClient** - API communication

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
