import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events';

function EditEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const event = useSelector(state => state.events[eventId]);

  const [name, setName] = useState(event.name);
  const [address, setAddress] = useState(event.address);
  const [city, setCity] = useState(event.city);
  const [state, setState] = useState(event.state);
  const [description, setDescription] = useState(event.description);
  const [eventImage, setEventImage] = useState(event.eventImage);
  const [startsAt, setStartsAt] = useState(event.startsAt);
  const [endsAt, setEndsAt] = useState(event.endsAt);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...event,
      name,
      address,
      city,
      state,
      description,
      event_image: eventImage,
      starts_at: startsAt,
      ends_at: endsAt
    };

    await dispatch(eventActions.updateEvent(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push(`/events/${eventId}`);

  };

  const cancelEdit = () => history.goBack();

  // const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  //   month: 'long', day: 'numeric',
  //   hour: 'numeric', minute: 'numeric', hour12: true
  // }); // "April 3 at 7:23 AM"
  // const starts = dateTimeFormat.format(new Date(startsAt));
  // const ends = dateTimeFormat.format(new Date(endsAt));

  const states = [
    'Alaska	AK', 'Arizona AZ', 'Arkansas AR',
    'American Samoa AS', 'California CA', 'Colorado CO',
    'Connecticut CT', 'Delaware DE', 'District of Columbia DC',
    'Florida FL', 'Georgia GA', 'Guam GU',
    'Hawaii HI', 'Idaho ID', 'Illinois IL',
    'Indiana IN', 'Iowa IA', 'Kansas KS',
    'Louisiana LA', 'Maine ME', 'Maryland MD',
    'Massachusetts MA', 'Michigan MI', 'Minnesota MN',
    'Mississippi MS', 'Missouri MO', 'Montana MT',
    'Nebraska NE', 'Nevada NV', 'New Hampshire NH',
    'New Jersey NJ', 'New Mexico NM', 'New York	NY',
    'North Carolina NC', 'North Dakota ND', 'Northern Mariana Islands MP',
    'Oklahoma OK', 'Oregon OR', 'Pennsylvania PA',
    'Puerto Rico PR', 'Rhode Island RI', 'South Carolina SC',
    'South Dakota SD', 'Tennessee TN', 'Texas TX',
    'Trust Territories TT', 'Utah UT', 'Vermont VT',
    'Virginia VA', 'Virgin Islands VI', 'Washington WA',
    'West Virginia WV', 'Wisconsin WI', 'Wyoming WY'
  ]

  return (
    <div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form className='event-form' onSubmit={handleSubmit}>
        <div className='img-div'>
          <img src={eventImage} alt='event Cover' id='image' />
          <input
            type='text'
            placeholder='Upload Image'
            required
            value={eventImage}
            onChange={e => setEventImage(e.target.value)}
          />
        </div>
        <div className='edit-info'>
          {/* <h5>{event.status}</h5> */}
          {/* <h1 className='header'> */}
          <input
            type='text'
            placeholder='Name'
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {/* </h1> */}

          {/* <h2 className='header'>{`When`}</h2> */}
          {/* <p>{`${starts} - ${ends}`}</p> */}
          <input
            id='start-time'
            type='datetime-local'
            required
            value={startsAt}
            onChange={e => setStartsAt(e.target.value)}
            min={event.startsAt}
          />
          <input
            id='end-time'
            type='datetime-local'
            required
            value={endsAt}
            onChange={e => setEndsAt(e.target.value)}
            // onChange={checkEndTime}
            min={startsAt}
          />
          {/* <h2 className='header'>{`Where`}</h2> */}
          {/* <p>{`${address} ${city}, ${state}`}</p> */}
          <input
            type='text'
            placeholder='Address'
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type='text'
            placeholder='City'
            required
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <select onChange={e => setState(e.target.value)} required>
            {states.map((st, idx) =>
              st.slice(-2) === state ? (
                <option key={idx} value={st.slice(-2)} selected>
                  {st.slice(0, -3)}
                </option>
              ) : (
                <option key={idx} value={st.slice(-2)}>
                  {st.slice(0, -3)}
                </option>
              )
            )}
          </select>
          {/* <p className='desc'>{description}</p> */}
          <textarea
            type='text'
            placeholder='Description'
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type='submit' id='edit-event'>Save</button>
        <button type='button' onClick={cancelEdit} id='delete-event'>Cancel</button>
      </form>
    </div>
  );
}

export default EditEventPage;
