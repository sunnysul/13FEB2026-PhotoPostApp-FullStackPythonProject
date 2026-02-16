from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from models import PhotoPost, User
from extensions import db
from decorators import role_required


class PhotoPostList(Resource):
    """
    GET  /api/posts       - Public: View all photo posts
    POST /api/posts       - Authenticated: Create a new photo post
    """

    def get(self):
        """Get all photo posts (public - no auth required)."""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # Clamp per_page to reasonable limits
        per_page = min(per_page, 100)

        pagination = PhotoPost.query.order_by(
            PhotoPost.created_at.desc()
        ).paginate(page=page, per_page=per_page, error_out=False)

        posts = [post.to_dict() for post in pagination.items]

        return {
            'posts': posts,
            'total': pagination.total,
            'page': pagination.page,
            'pages': pagination.pages,
            'per_page': pagination.per_page
        }, 200

    @jwt_required()
    def post(self):
        """Create a new photo post (authenticated users only)."""
        data = request.get_json()

        if not data:
            return {'message': 'No input data provided'}, 400

        title = data.get('title', '').strip()
        description = data.get('description', '').strip()
        image_url = data.get('image_url', '').strip()

        if not title:
            return {'message': 'Title is required'}, 400

        if not image_url:
            return {'message': 'Image URL is required'}, 400

        current_user_id = int(get_jwt_identity())

        new_post = PhotoPost(
            title=title,
            description=description,
            image_url=image_url,
            user_id=current_user_id
        )

        db.session.add(new_post)
        db.session.commit()

        return {
            'message': 'Photo post created successfully',
            'post': new_post.to_dict()
        }, 201


class PhotoPostDetail(Resource):
    """
    GET    /api/posts/<id>  - Public: View a single photo post
    PUT    /api/posts/<id>  - Authenticated owner: Update own post
    DELETE /api/posts/<id>  - Owner can delete own post, admin can delete any post
    """

    def get(self, post_id):
        """Get a single photo post by ID (public)."""
        post = PhotoPost.query.get(post_id)

        if not post:
            return {'message': 'Photo post not found'}, 404

        return {'post': post.to_dict()}, 200

    @jwt_required()
    def put(self, post_id):
        """Update a photo post (owner only)."""
        post = PhotoPost.query.get(post_id)

        if not post:
            return {'message': 'Photo post not found'}, 404

        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        # Only the owner or admin can update
        if post.user_id != current_user_id and user.role != 'admin':
            return {'message': 'You are not authorized to update this post'}, 403

        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400

        if 'title' in data:
            post.title = data['title'].strip()
        if 'description' in data:
            post.description = data['description'].strip()
        if 'image_url' in data:
            post.image_url = data['image_url'].strip()

        db.session.commit()

        return {
            'message': 'Photo post updated successfully',
            'post': post.to_dict()
        }, 200

    @jwt_required()
    def delete(self, post_id):
        """Delete a photo post. Owner can delete own post, admin can delete any post."""
        post = PhotoPost.query.get(post_id)

        if not post:
            return {'message': 'Photo post not found'}, 404

        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        # Admin can delete any post, regular user can only delete their own
        if user.role == 'admin' or post.user_id == current_user_id:
            db.session.delete(post)
            db.session.commit()
            return {'message': 'Photo post deleted successfully'}, 200

        return {'message': 'You are not authorized to delete this post'}, 403


class UserPhotoPosts(Resource):
    """
    GET /api/users/me/posts - Authenticated: Get current user's own posts
    """

    @jwt_required()
    def get(self):
        """Get all photo posts by the current authenticated user."""
        current_user_id = int(get_jwt_identity())

        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        per_page = min(per_page, 100)

        pagination = PhotoPost.query.filter_by(
            user_id=current_user_id
        ).order_by(
            PhotoPost.created_at.desc()
        ).paginate(page=page, per_page=per_page, error_out=False)

        posts = [post.to_dict() for post in pagination.items]

        return {
            'posts': posts,
            'total': pagination.total,
            'page': pagination.page,
            'pages': pagination.pages,
            'per_page': pagination.per_page
        }, 200


class AdminAllPosts(Resource):
    """
    GET    /api/admin/posts            - Admin: View all posts
    DELETE /api/admin/posts/<post_id>  - Admin: Delete any post
    """

    @role_required('admin')
    def get(self):
        """Admin: get all posts with user info."""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        per_page = min(per_page, 100)

        pagination = PhotoPost.query.order_by(
            PhotoPost.created_at.desc()
        ).paginate(page=page, per_page=per_page, error_out=False)

        posts = [post.to_dict() for post in pagination.items]

        return {
            'posts': posts,
            'total': pagination.total,
            'page': pagination.page,
            'pages': pagination.pages,
            'per_page': pagination.per_page
        }, 200


class AdminDeletePost(Resource):
    """Admin endpoint to delete any post by ID."""

    @role_required('admin')
    def delete(self, post_id):
        """Admin: delete any post."""
        post = PhotoPost.query.get(post_id)

        if not post:
            return {'message': 'Photo post not found'}, 404

        db.session.delete(post)
        db.session.commit()

        return {'message': f'Photo post {post_id} deleted successfully by admin'}, 200
