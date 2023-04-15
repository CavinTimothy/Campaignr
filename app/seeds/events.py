from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_events():
    event1 = Event(
        name = 'Grand Opening!',
        address = '555 15th St.',
        city = 'Portland',
        state = 'OR',
        description = 'Come celebrate our grand opening!',
        user_id = 1,
        event_image = 'https://soundcloneupload.s3.us-west-2.amazonaws.com/event-seed1.jpg',
        starts_at = datetime.strptime('2023-03-19 13:30', '%Y-%m-%d %H:%M'),
        ends_at = datetime.strptime('2023-03-19 18:00', '%Y-%m-%d %H:%M')
    )
    event2 = Event(
        name = 'Seattle Fundraiser',
        address = '556 Commercial Rd.',
        city = 'Seattle',
        state = 'WA',
        description = 'Come to Seattle for our first fundraiser!',
        user_id = 2,
        event_image = 'https://soundcloneupload.s3.us-west-2.amazonaws.com/event-seed2.jpg',
        starts_at = datetime.strptime('2023-04-03 09:00', '%Y-%m-%d %H:%M'),
        ends_at = datetime.strptime('2023-04-03 20:00', '%Y-%m-%d %H:%M')
    )
    event3 = Event(
        name = 'Spring 2023 Concert',
        address = '223 Green Ave.',
        city = 'Boise',
        state = 'ID',
        description = 'Show support to our local performers in Boise!',
        user_id = 3,
        event_image = 'https://soundcloneupload.s3.us-west-2.amazonaws.com/event-seed3.jpg',
        starts_at = datetime.strptime('2023-05-18 21:00', '%Y-%m-%d %H:%M'),
        ends_at = datetime.strptime('2023-05-18 23:30', '%Y-%m-%d %H:%M')
    )

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
