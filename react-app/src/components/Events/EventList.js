import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../store/events';
import './Events.css';

function EventList({ home }) {
  const dispatch = useDispatch();
  let events = useSelector(state => Object.values(state.events));

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (home) events = events.filter(event => event.status === 'Upcoming' || event.status === 'Ongoing');

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

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: '2-digit', weekday: 'short',
    hour: 'numeric', minute: 'numeric', hour12: true
  }); // "Mon, Apr 03, 7:23 AM"

  return (
    <div id='eventList'>
      {!home && (
        <div className='all-events'>
          <h1>All our Events</h1>
          <h2><b style={{ color: 'red' }}>Past</b>,
            <b style={{ color: 'blue' }}> Present</b>, and
            <b style={{ color: 'green' }}> Future</b></h2>
        </div>
      )}
      <ul className='eventUl'>
        {events && events.map(({ id, name, city, state, description, eventImage, startsAt, status }, idx) => (
          <li key={idx} className='eventLi'>
            <Link className='event-link' to={`/events/${id}`}>
              <div className='eventItem'>
                <h3 className='event-title'>{name}</h3>
                <h5 className='eventTime'>{`${dateTimeFormat.format(new Date(startsAt))} - `}{statusColor(status)}</h5>
                <h5>{`${city}, ${state}`}</h5>
                <img src={eventImage} alt='Event thumbnail' className='img' style={{ width: '200px', 'max-height': '100px' }} />
                <p className='eventP'>{`${description.slice(0, 30)}...`}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList;
