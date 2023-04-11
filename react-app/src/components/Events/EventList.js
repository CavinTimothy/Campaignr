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

  return (
    <>
      {events && events.map(({ name, city, state, description, eventImage, startTime, status }, idx) => (
        <li key={idx} className='homeLi'>
          <Link className='homeSong' to={`/events/${events[idx].id}`}>
            <div className='homeItem'>
              <h3 className='homeItem soti'>{name}</h3>
              <h5>{`${startTime} - ${status}`}</h5>
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
