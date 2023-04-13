import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import { fetchEvents } from '../../store/events';

function EventList() {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events));

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: '2-digit', weekday: 'short',
    hour: 'numeric', minute: 'numeric', hour12: true
  }); // "Mon, Apr 03, 7:23 AM"

  return (
    <>
      {events && events.map(({ id, name, city, state, description, eventImage, startsAt, status }, idx) => (
        <li key={idx} className='homeLi'>
          <Link className='homeSong' to={`/events/${id}`}>
            <div className='homeItem'>
              <h3 className='homeItem soti'>{name}</h3>
              <h5>{`${dateTimeFormat.format(new Date(startsAt))} - ${status}`}</h5>
              <p>{`${city}, ${state}`}</p>
              <img src={eventImage} alt='Event Image' className='homeItem img' style={{ width: '200px' }} />
              <p className='homeP'>{description}</p>
            </div>
          </Link>
        </li>
      ))}
    </>
  )
}

export default EventList
