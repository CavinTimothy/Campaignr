from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)

# GET ALL USERS
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# GET A USER BY ID
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# # UPDATE A USER
# @user_routes.route('/<int:id>', methods=['POST'])
# @login_required
# def update_user(id):
#     """
#     Update a user
#     """
#     form = UserForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User.query.get(id)
#         form.populate_obj(user)
#         db.session.commit()
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
