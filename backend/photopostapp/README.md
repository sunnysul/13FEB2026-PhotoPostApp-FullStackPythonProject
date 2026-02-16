# PhotoPostApp - Flask REST API

A stateless RESTful photo post application built with Flask, JWT authentication, and Role-Based Access Control (RBAC).

## Features

- **User Registration & Login** with JWT token authentication
- **Photo Posts** with title, description, and image URL
- **RBAC** with two roles: `user` and `admin`
- **Public access** to view all posts (no auth needed)
- **Pagination** on all list endpoints
- **SQLite** database via SQLAlchemy

## Roles & Permissions

| Action | Public | User | Admin |
|---|:---:|:---:|:---:|
| View all posts | ✅ | ✅ | ✅ |
| View single post | ✅ | ✅ | ✅ |
| Create post | ❌ | ✅ | ✅ |
| Update own post | ❌ | ✅ | ✅ |
| Delete own post | ❌ | ✅ | ✅ |
| Delete any post | ❌ | ❌ | ✅ |
| View all users | ❌ | ❌ | ✅ |

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/auth/profile` | Get current user profile | JWT |

### Photo Posts
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts` | Get all posts (paginated) | No |
| GET | `/api/posts/<id>` | Get a single post | No |
| POST | `/api/posts` | Create a new post | JWT |
| PUT | `/api/posts/<id>` | Update a post (owner/admin) | JWT |
| DELETE | `/api/posts/<id>` | Delete a post (owner/admin) | JWT |
| GET | `/api/users/me/posts` | Get current user's posts | JWT |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | List all users | JWT (admin) |
| GET | `/api/admin/posts` | List all posts | JWT (admin) |
| DELETE | `/api/admin/posts/<id>` | Delete any post | JWT (admin) |

## Setup

```bash
pip install flask flask-cors flask-jwt-extended flask-restful flask-sqlalchemy
python main.py
```

Server runs at `http://localhost:5000`.

## Project Structure

```
photopostapp/
├── main.py          # App factory & route registration
├── config.py        # Configuration settings
├── extensions.py    # Flask extension instances (db, jwt)
├── models.py        # SQLAlchemy models (User, PhotoPost)
├── auth.py          # Auth endpoints (Register, Login, Profile)
├── routes.py        # Photo post endpoints & admin endpoints
├── decorators.py    # RBAC decorators (role_required, admin_required)
├── pyproject.toml   # Project metadata & dependencies
├── PhotoPostApp.postman_collection.json  # Postman API collection
└── README.md
```

## Postman Collection

Import `PhotoPostApp.postman_collection.json` into Postman. The collection includes:

1. **Auth** - Register user/admin, login (auto-saves tokens)
2. **Photo Posts (Public)** - View all/single posts
3. **Photo Posts (User)** - Create, update, delete own posts
4. **Admin** - View all users, view/delete any post
5. **Error Cases** - Missing fields, no auth, wrong role, wrong password

### Testing Workflow
1. Run "Register User" and "Register Admin"
2. Run "Login User" → token auto-saved to `{{access_token}}`
3. Run "Login Admin" → token auto-saved to `{{admin_access_token}}`
4. Test remaining endpoints
