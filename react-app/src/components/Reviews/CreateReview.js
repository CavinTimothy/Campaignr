import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';

function CreateReview() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const review = {
      subject,
      body
    }

    setSubject('');
    setBody('');
    dispatch(createReview(review, eventId));
  };

  return (
    <>
      <form id='input' onSubmit={handleSubmit}>
        <input
          type='text'
          value={subject}
          placeholder={'Title your review'}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          type='text'
          value={body}
          placeholder={'Write your review here...'}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default CreateReview;
