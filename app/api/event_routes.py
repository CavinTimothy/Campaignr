from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Event, Review
from app.forms import EventForm, ReviewForm

event_routes = Blueprint('event', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL EVENTS
@event_routes.route('/', methods=['GET'])
def get_all_events():
    """
    Query for all events and returns them in a list of event dictionaries
    """
    events = Event.query.all()
    return [event.to_dict() for event in events]


# GET EVENT BY ID
@event_routes.route('/<int:id>')
def get_event(id):
    """
    Query for a event by id and returns that event in a dictionary
    """
    event = Event.query.get(id)
    if event:
        return jsonify(event.to_dict())
    else:
        return jsonify({
            'success': False,
            'message': 'Event not found'
        })


# CREATE AN EVENT
@event_routes.route('', methods=['POST'])
@login_required
def create_event():
    """
    Query for creating an event and returning it as a dictionary
    """
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_event = Event()
        new_event.user_id = current_user.id
        form.populate_obj(new_event)
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE AN EVENT
@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_event(id):
    """
    Update a event
    """
    event = Event.query.get(id)
    if not event:
        return jsonify({'message': 'Couldn\'t find event', 'statusCode': 404}), 404
    if event.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(event)
        db.session.commit()
        return jsonify(event.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE AN EVENT
@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    """
    Delete a event
    """
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Event deleted successfully!'
    })

# GET ALL REVIEWS BY EVENT ID
@event_routes.route('/<int:id>/reviews')
def get_reviews(id):
    reviews = Review.query.options(joinedload(Review.user)).filter_by(event_id=id).all()
    if not reviews:
        return jsonify({'message': 'Reviews couldn\'t be found', 'statusCode': 404}), 404
    review_list = [review.to_dict() for review in reviews]
    return jsonify(review_list), 200


# CREATE A REVIEW BY EVENT ID
@event_routes.route('/<int:event_id>/reviews', methods=['POST'])
@login_required
def add_review(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'message': 'Event ID couldn\'t be found', 'statusCode': 404}), 404
    print(request.json)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review()
        review.user_id = current_user.id
        review.event_id = event_id
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
