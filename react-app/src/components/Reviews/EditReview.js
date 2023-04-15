import { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { updateReview } from '../../store/reviews';

function EditReview({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [subject, setSubject] = useState(review.subject);
  const [body, setBody] = useState(review.body);

  const handleSubmit = async e => {
    e.preventDefault();

    const newReview = {
      ...review,
      subject,
      body
    }

    dispatch(updateReview(newReview));
    closeModal();
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
        <button type='submit'>Save</button>
      </form>
    </>
  )
}

export default EditReview;
