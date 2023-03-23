from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text

def seed_events():
    event1 = Event(
        name = '',
        address = '',
        city = '',
        state = '',
        country = '',
        description = '',
        user_id = 1,
        event_image = '',
        starts_at = '',
        ends_at = ''
    )
    event2 = Event(
        name = '',
        address = '',
        city = '',
        state = '',
        country = '',
        description = '',
        user_id = 2,
        event_image = '',
        starts_at = '',
        ends_at = ''
    )
    event3 = Event(
        name = '',
        address = '',
        city = '',
        state = '',
        country = '',
        description = '',
        user_id = 3,
        event_image = '',
        starts_at = '',
        ends_at = ''
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
