# PhotoPostApp Frontend - User Guide

## Getting Started

### 1. First Time Setup

1. Install dependencies:
```bash
cd frontend/photopostapp
npm install
```

2. Start the backend API (in another terminal):
```bash
cd backend/photopostapp
# Follow backend setup instructions
```

3. Start the Angular development server:
```bash
npm start
```

4. Open your browser to `http://localhost:4200`

## User Workflows

### Public User (Not Logged In)

#### Browse Photo Gallery
1. Visit homepage (`/`)
2. View all public photo posts
3. Use pagination to browse more posts
4. Click on any post to view details

### Registered User Workflow

#### Registration
1. Click "Register" in the navbar
2. Fill in the form:
   - Username (min 3 characters)
   - Email (valid email)
   - Password (min 6 characters)
   - Role (User or Admin)
3. Click "Create account"
4. Redirected to login page after success

#### Login
1. Click "Login" in the navbar
2. Enter credentials:
   - Username
   - Password
3. Click "Sign in"
4. Redirected to homepage after successful login
5. Navbar shows your username and logout button

#### Creating a Post
1. Login first
2. Click "Create Post" in navbar (or from My Posts page)
3. Fill in the form:
   - **Title**: Catchy title for your photo (min 3 characters)
   - **Description**: Describe your photo (min 10 characters)
   - **Image URL**: Full URL to your image (must start with http:// or https://)
4. Preview your image as you type the URL
5. Click "Create Post"
6. Redirected to "My Posts" page

#### Managing Your Posts
1. Click "My Posts" in navbar
2. View all your posts
3. For each post you can:
   - **View**: See full details
   - **Edit**: Modify title, description, or image URL
   - **Delete**: Remove the post (with confirmation)

#### Viewing Post Details
1. Click on any post card (from home or my posts)
2. View full-size image and complete description
3. See author and timestamps
4. If it's your post, you'll see Edit and Delete buttons

### Admin User Workflow

Admin users have all regular user capabilities plus:

#### Accessing Admin Dashboard
1. Login as admin
2. Click "Admin" in navbar
3. View admin dashboard

#### Managing Users (Admin)
1. Go to Admin dashboard
2. Click "Users" tab
3. View table of all registered users:
   - User ID
   - Username
   - Email
   - Role (User/Admin badge)
   - Creation date

#### Managing All Posts (Admin)
1. Go to Admin dashboard
2. Click "Posts" tab
3. View table of all posts from all users:
   - Post ID
   - Thumbnail
   - Title
   - Author
   - Creation date
4. Actions available:
   - **View**: See post details
   - **Delete**: Remove any post (with confirmation)
5. Use pagination if there are many posts

## Features Explained

### Authentication
- JWT tokens stored in browser localStorage
- Automatic token attachment to API requests
- Session persists across page refreshes
- Logout clears all stored data

### Route Protection
- `/my-posts` - Requires login
- `/create-post` - Requires login
- `/edit-post/:id` - Requires login
- `/admin` - Requires admin role

### Responsive Design
- Mobile-friendly navigation
- Adaptive grid layouts
- Touch-friendly controls
- Works on all screen sizes

### Form Validation
All forms include real-time validation:
- Required field checks
- Minimum length requirements
- Email format validation
- URL format validation
- Visual feedback for errors

### Pagination
- Gallery and admin views support pagination
- Configurable items per page
- Previous/Next navigation
- Direct page number selection

## Troubleshooting

### Cannot Login
- Check backend is running on `http://localhost:5000`
- Verify credentials are correct
- Check browser console for errors

### Posts Not Loading
- Ensure backend API is accessible
- Check browser console for CORS errors
- Verify API endpoint in `environment.ts`

### Images Not Displaying
- Verify image URL is accessible
- Check URL format (must start with http:// or https://)
- Try the URL directly in browser

### "Unauthorized" Errors
- Token may have expired - logout and login again
- Check if you have necessary permissions
- Verify you're logged in

## Sample Image URLs for Testing

You can use these free image URLs for testing posts:
- https://picsum.photos/800/600?random=1
- https://picsum.photos/800/600?random=2
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4
- https://source.unsplash.com/800x600/?nature
- https://source.unsplash.com/800x600/?technology

## Environment Configuration

### Development (default)
File: `src/app/environments/environment.ts`
```typescript
apiUrl: 'http://localhost:5000/api'
```

### Production
File: `src/app/environments/environment.prod.ts`
```typescript
apiUrl: '/api'  // Assumes backend on same domain
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

1. **Always logout** when done to clear session
2. **Use descriptive titles** for better searchability
3. **Provide good descriptions** to engage viewers
4. **Test image URLs** before posting
5. **Admin users**: Be careful when deleting posts - action cannot be undone!
