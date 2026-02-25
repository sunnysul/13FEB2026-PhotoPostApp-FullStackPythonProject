from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from config import Config
from extensions import db, jwt
from models import User, PhotoPost
from auth import Register, Login, UserProfile, UserList
from routes import PhotoPostList, PhotoPostDetail, UserPhotoPosts, AdminAllPosts, AdminDeletePost


def create_app():
    """Application factory pattern."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Create API
    api = Api(app)

    # ── Auth endpoints ──────────────────────────────────────────────
    api.add_resource(Register, '/api/auth/register')
    api.add_resource(Login, '/api/auth/login')
    api.add_resource(UserProfile, '/api/auth/profile')
    api.add_resource(UserList, '/api/admin/users')

    # ── Photo Post endpoints ────────────────────────────────────────
    api.add_resource(PhotoPostList, '/api/posts')
    api.add_resource(PhotoPostDetail, '/api/posts/<int:post_id>')
    api.add_resource(UserPhotoPosts, '/api/users/me/posts')

    # ── Admin endpoints ─────────────────────────────────────────────
    api.add_resource(AdminAllPosts, '/api/admin/posts')
    api.add_resource(AdminDeletePost, '/api/admin/posts/<int:post_id>')

    # Create database tables
    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


