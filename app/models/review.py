from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(255))
    body = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('events.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='reviews')
    event = db.relationship('Event', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body,
            'userId': self.user_id,
            'eventId': self.event_id,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M'),
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M')
        }
