from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models import User


def role_required(*roles):
    """
    Decorator to enforce role-based access control.
    Usage: @role_required('admin') or @role_required('user', 'admin')
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = int(get_jwt_identity())
            user = User.query.get(current_user_id)

            if not user:
                return {'message': 'User not found'}, 404

            if user.role not in roles:
                return {
                    'message': f'Access denied. Required role(s): {", ".join(roles)}. Your role: {user.role}'
                }, 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator


def admin_required(fn):
    """Shortcut decorator for admin-only endpoints."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        if not user:
            return {'message': 'User not found'}, 404

        if user.role != 'admin':
            return {'message': 'Admin access required'}, 403

        return fn(*args, **kwargs)
    return wrapper
