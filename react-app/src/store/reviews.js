const SET_REVIEWS = 'reviews/SET_REVIEWS';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const setReviews = reviews => {
  return {
    type: SET_REVIEWS,
    reviews
  };
};

export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
};

// // GET all reviews of current user
// export const fetchMyReviews = () => async dispatch => {
//   const res = await fetch(`/api/me/reviews`);
//   const reviews = await res.json();
//   dispatch(setReviews(reviews));
//   return res;
// };

// *(GET) Read all reviews based on a event id
export const fetchReviews = eventId => async dispatch => {
  const res = await fetch(`/api/events/${eventId}/reviews`);
  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews(data));
  }
  return res;
};

// // GET 10 most recent reviews
// export const fetchRecentReviews = () => async dispatch => {
//   const res = await fetch(`/api/reviews`);
//   const data = await res.json();
//   if (res.ok) {
//     dispatch(setReviews(data));
//   }
//   return res;
// };

// *(POST) Create a review
export const createReview = (review, eventId) => async dispatch => {
  const res = await fetch(`/api/events/${eventId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews([data]));
  }
  return data;
};

// *(PUT) Update a review
export const updateReview = review => async dispatch => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setReviews([data]));
  }
  return data;
};

// *(DELETE) Delete a review
export const deleteReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
  return res;
};

const reviewsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_REVIEWS:
      action.reviews.forEach(review => newState[review.id] = review);
      return newState;

    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
