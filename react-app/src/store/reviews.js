const SET_REVIEW = 'reviews/SET_REVIEW';
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const setReview = review => {
  return {
    type: SET_REVIEW,
    review
  };
};

export const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  };
};

export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
};

// *(GET) Read all reviews based on a event id
export const fetchReviews = eventId => async dispatch => {
  const res = await fetch(`/api/events/${eventId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getReviews(data));
  } else dispatch(getReviews())
};

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
    dispatch(setReview(data));
  }
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
    dispatch(setReview(data));
  }
};

// *(DELETE) Delete a review
export const deleteReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return { ...state, [action.review.id]: action.review };

    case GET_REVIEWS:
      const newState = {};
      if (action.reviews) action.reviews.forEach(review => newState[review.id] = review);
      else return newState;
      return { ...newState };

    case REMOVE_REVIEW:
      delete state[action.reviewId];
      return state;
    default:
      return state;
  }
};

export default reviewsReducer;
