import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/events';

function CreateEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  if (!user) history.push('/');

  const demoUser = user.id === 1 ? true : false;
  const [name, setName] = useState(demoUser ? 'High 5 day!' : '');
  const [address, setAddress] = useState(demoUser ? '123 up-high St' : '');
  const [city, setCity] = useState(demoUser ? 'San Diego' : '');
  const [state, setState] = useState(demoUser ? 'CA' : '');
  const [description, setDescription] = useState(demoUser ? 'Join us in San Diego to set the world record for the largest group high 5!' : '');
  const [eventImage, setEventImage] = useState(demoUser ? 'https://soundcloneupload.s3.us-west-2.amazonaws.com/event-demo1.jpeg' : '');
  const [startsAt, setStartsAt] = useState(demoUser ? '2023-05-22T13:00' : '');
  const [endsAt, setEndsAt] = useState(demoUser ? '2023-05-22T18:00' : '');
  // date = new Date() -> Wed Apr 12 2023 21:39:08 GMT-0700 (Pacific Daylight Time)
  //  date = Date() -> "Wed Apr 12 2023 21:39:08 GMT-0700 (Pacific Daylight Time)"
  // date1 = date.toJSON() -> "2023-04-13T04:39:08.043Z"
  // date2 = date1.slice(0, -8) -> "2023-04-13T04:39"

  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      name,
      address,
      city,
      state,
      description,
      event_image: eventImage,
      starts_at: startsAt,
      ends_at: endsAt
    };

    const data = await dispatch(createEvent(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push(`/events/${data.id}`);
  };

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
      <div>
      </div>
      <form className='event-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Start Date and Time</label>
        <input
          id='start-time'
          type='datetime-local'
          required
          value={startsAt}
          onChange={e => setStartsAt(e.target.value)}
          // onChange={checkStartTime}
          min={new Date().toJSON().slice(0, -8)}
        />
        <label>End Date and Time</label>
        <input
          id='end-time'
          type='datetime-local'
          required
          value={endsAt}
          onChange={e => setEndsAt(e.target.value)}
          // onChange={checkEndTime}
          min={startsAt}
        />
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
          <option value={''}>Select State</option>
          {states.map((state, idx) =>
            <option key={idx} value={state.slice(-2)}>
              {state.slice(0, -3)}
            </option>
          )}
        </select>
        <textarea
          type='text'
          placeholder='Write about the event here...'
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Upload Image'
          required
          value={eventImage}
          onChange={e => setEventImage(e.target.value)}
        />
        <button type='submit'>Publish</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
