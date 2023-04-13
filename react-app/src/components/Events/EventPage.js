import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events'
import ReviewFeed from '../Reviews/ReviewFeed';

function EventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[eventId]);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    dispatch(eventActions.fetchEvent(eventId));
  }, [dispatch, eventId]);

  if (isDeleted) {
    dispatch(eventActions.fetchEvents());
    return (<Redirect to={`/`} />);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this beer?')) return;
    dispatch(eventActions.deleteEvent(eventId));
    history.push('/');
    setIsDeleted(true)
  }

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  }); // "April 3 at 7:23 AM"
  const starts = dateTimeFormat.format(new Date(event.startsAt));
  const ends = dateTimeFormat.format(new Date(event.endsAt));

  return (
    <>
      <div style={{ backgroundImage: 'url(' + event.eventImage + ')' }} className='container'>
        <div className='layer'>
          <img src={event.eventImage} alt='event Cover' id='image' />
          <div className='info'>
            <h5>{event.status}</h5>
            <h1 className='header'>{event.name}</h1>
            <h2 className='header'>{`When`}</h2>
            <p>{`${starts} - ${ends}`}</p>
            <h2 className='header'>{`Where`}</h2>
            <p>{`${event.address}, ${event.city}, ${event.state}`}</p>
            <p className='desc'>{event.description}</p>
            {user.id === event.userId && (
              <span className='actions'>
                <button>
                  <Link to={`/events/${eventId}/edit`}>Edit</Link>
                </button>
                <button onClick={handleDelete}>Delete</button>
              </span>
            )}
          </div>
        </div>
      </div>
      <ReviewFeed />
    </>
  );
}

export default EventPage
