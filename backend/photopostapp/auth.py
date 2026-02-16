from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from extensions import db


class Register(Resource):
    """User registration endpoint."""

    def post(self):
        data = request.get_json()

        # Validate required fields
        if not data:
            return {'message': 'No input data provided'}, 400

        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        role = data.get('role', 'user')  # Default role is 'user'

        if not username or not email or not password:
            return {'message': 'Username, email, and password are required'}, 400

        if role not in ('user', 'admin'):
            return {'message': 'Role must be either "user" or "admin"'}, 400

        if len(password) < 6:
            return {'message': 'Password must be at least 6 characters long'}, 400

        # Check for existing user
        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists'}, 409

        if User.query.filter_by(email=email).first():
            return {'message': 'Email already exists'}, 409

        # Create user
        new_user = User(username=username, email=email, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return {
            'message': 'User registered successfully',
            'user': new_user.to_dict()
        }, 201


class Login(Resource):
    """User login endpoint."""

    def post(self):
        data = request.get_json()

        if not data:
            return {'message': 'No input data provided'}, 400

        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            # Include role in the token claims via additional_claims
            access_token = create_access_token(
                identity=str(user.id),
                additional_claims={'role': user.role}
            )
            return {
                'message': 'Login successful',
                'access_token': access_token,
                'user': user.to_dict()
            }, 200

        return {'message': 'Invalid username or password'}, 401


class UserProfile(Resource):
    """Get current user profile."""

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        if not user:
            return {'message': 'User not found'}, 404

        return {'user': user.to_dict()}, 200


class UserList(Resource):
    """Admin endpoint to list all users."""

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        if not user or user.role != 'admin':
            return {'message': 'Admin access required'}, 403

        users = User.query.all()
        return {'users': [u.to_dict() for u in users]}, 200
