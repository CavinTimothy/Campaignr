const SET_EVENTS = 'events/SET_EVENTS';
const REMOVE_EVENT = 'events/REMOVE_EVENT';

export const setEvents = events => {
  return {
    type: SET_EVENTS,
    events
  };
};

export const removeEvent = eventId => {
  return {
    type: REMOVE_EVENT,
    eventId
  };
};

// *(GET) Read all events
export const fetchEvents = () => async dispatch => {
  const res = await fetch('/api/events', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setEvents(data));
  }
};

// *(GET) Read an event by id
export const fetchEvent = eventId => async dispatch => {
  const res = await fetch(`/api/events/${eventId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setEvents([data]));
  }
};

// *(POST) Create an event
export const createEvent = event => async dispatch => {
  const res = await fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setEvents([data]));
  }
  return data;
};

// *(PUT) Update an event
export const updateEvent = event => async dispatch => {
  const res = await fetch(`/api/events/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setEvents([data]));
  }
};

// *(DELETE) Delete an event
export const deleteEvent = eventId => async dispatch => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeEvent(eventId));
  }
  // return res;
};

const eventsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_EVENTS:
      action.events.forEach(event => newState[event.id] = event);
      return newState;

    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
