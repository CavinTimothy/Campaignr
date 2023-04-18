import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events'
import ReviewFeed from '../Reviews/ReviewFeed';

function EventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.events[eventId])

  useEffect(() => {
    dispatch(eventActions.fetchEvents());
  }, [dispatch]);

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: true
  }); // "April 3 at 7:23 AM"

  const handleDelete = (e) => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this event?')) return;
    dispatch(eventActions.deleteEvent(eventId));
    history.push('/');
  }

  const statusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return (<b style={{ color: 'green' }} >{status}</b>)
      case 'Ongoing':
        return (<b style={{ color: 'blue' }} >{status}</b>)
      case 'Ended':
        return (<b style={{ color: 'red' }} >{status}</b>)
      default:
        return (<b>{status}</b>)
    }
  }

  return (
    <>
      {event && (
        <div className='event-page-container' style={{ backgroundImage: 'url(' + event.eventImage + ')' }}>
          <div className='event-layer'>
            <img src={event.eventImage} alt='Event Cover' id='image' />
            <div className='info'>
              <h5>{statusColor(event.status)}</h5>
              <h1 className='event-page-title'>{event.name}</h1>
              <h3 className='event-wh'>{`When`}</h3>
              <p className='event-info'>{`${dateTimeFormat.format(new Date(event.startsAt))} - ${dateTimeFormat.format(new Date(event.endsAt))}`}</p>
              <h3 className='event-wh'>{`Where`}</h3>
              <p className='event-info'>{`${event.address} ${event.city}, ${event.state}`}</p>
              <p className='desc'>{event.description}</p>
              {user && user.id === event.userId && (
                <span className='actions'>
                  <Link to={`/events/${eventId}/edit`}>
                    <button id='edit-event'>Edit</button>
                  </Link>
                  <button onClick={handleDelete} id='delete-event'>Delete</button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <ReviewFeed />
    </>
  );
}

export default EventPage;
