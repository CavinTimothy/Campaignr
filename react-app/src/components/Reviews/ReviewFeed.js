import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviews, deleteReview } from '../../store/reviews';
import CreateReview from './CreateReview';
import EditReview from './EditReview';
import OpenModalButton from '../OpenModalButton';
import './Reviews.css'

function ReviewFeed() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const eventReviews = useSelector(state => Object.values(state.reviews));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchReviews(eventId));
  }, [dispatch, eventId]);


  const handleDelete = (e, reviewId) => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this review?')) return;
    dispatch(deleteReview(reviewId));
  }

  return (
    <div className='parent'>
      {sessionUser && (
        <CreateReview user={sessionUser} />
      )}
      {eventReviews.length > 0 && (
        <>
          <h4>Reviews</h4>
          <ul className='reviewUl'>
            {eventReviews.map(({ id, subject, body, user }, idx) => (
              <li key={idx} className='reviewItem'>
                <h5>{`${user.firstName} ${user.lastName[0]}.`}</h5>
                <p className='review-sub'>{subject}</p>
                <p id='review'>{body}</p>
                {sessionUser && sessionUser.id === user.id && (
                  <>
                    <OpenModalButton
                      buttonText="Edit"
                      modalComponent={<EditReview review={eventReviews[idx]} />}
                    />
                    <button onClick={(e) => handleDelete(e, id)} id='delete-review'>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ReviewFeed
