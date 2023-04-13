from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema' : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True)
    event_image = db.Column(db.String(255), nullable=False)
    starts_at = db.Column(db.DateTime, nullable=False)
    ends_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='events')
    reviews = db.relationship('Review', back_populates='event', cascade='all, delete-orphan')

    def to_dict(self):
        now = datetime.now()
        if now < self.starts_at:
            status = 'Upcoming'
        elif self.starts_at < now < self.ends_at:
            status = 'Ongoing'
        elif now > self.ends_at:
            status = 'Ended'

        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'userId': self.user_id,
            'eventImage': self.event_image,
            'startTime': self.starts_at.strftime('%a, %b %d, %I:%M %p'),
            'startsAt': self.starts_at.strftime('%Y-%m-%dT%H:%M'),
            'endsAt': self.ends_at.strftime('%Y-%m-%dT%H:%M'),
            'status': status
        }
