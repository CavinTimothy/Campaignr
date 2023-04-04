from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        subject = 'Exciting',
        body = 'Awesome event! Can\'t wait for more',
        user_id = 1,
        event_id = 1
    )
    review2 = Review(
        subject = 'Very interesting',
        body = 'Stumbled onto this event walking down the street. Glad I did! Excited to see what\'s next',
        user_id = 2,
        event_id = 1
    )
    review3 = Review(
        subject = 'What\'s this about?',
        body = 'The event overall was entertaining, but what kind of organization is this?',
        user_id = 3,
        event_id = 1
    )
    review4 = Review(
        subject = 'A great time!',
        body = 'I had an amazing day at this fundraiser! You should do a concert next',
        user_id = 1,
        event_id = 2
    )
    review5 = Review(
        subject = 'Nice',
        body = 'I was visiting family in Seattle when I ran into this fundraiser only to realize it\'s hosted by the same organization from the grand opening. What delightful coincidence!',
        user_id = 2,
        event_id = 2
    )
    review6 = Review(
        subject = 'Still confused',
        body = 'I was bored and decided to attend this event. Glad I did but what are you raising funds for? What kind of company is this? I need answers!',
        user_id = 3,
        event_id = 2
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
