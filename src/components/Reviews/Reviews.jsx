import "./Reviews.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import { Badge, Spinner } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { useForm } from "react-hook-form";

function Reviews({ movieId }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [reviewLoader, setReviewLoader] = useState(false);

  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getReviews = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/review/${movieId}`
    );
    setReviews(response.data);
    setReviewLoader(false);
  };

  useEffect(() => {
    const getTmdbReviews = async () => {
      const reviewsData = await axios.get(
        `/movie/${movieId}/reviews`,
        tmdbApiConfig
      );
      setTmdbReviews(reviewsData.data.results);
    };
    getTmdbReviews();
    getReviews();
    // eslint-disable-next-line
  }, [movieId]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setReviewLoader(true);
    await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + `/review/${movieId}`,
      data: data,
    });
    reset();
    setRating(0);
    setTimeout(() => getReviews(), 2000);
  };

  const handleRating = (event, newValue) => {
    if (event.type === "click") {
      setRating(0);
    } else {
      setRating(newValue);
      setValue("rating", newValue, { shouldValidate: true });
    }
  };

  return (
    <>
      <div className="reviews-container mt-5 pe-5">
        <h3 className="text-start mb-3 fs-4">Reviews</h3>
        {tmdbReviews.length > 0 || reviews.length > 0 ? (
          <div className="review-container scroll px-3 rounded-3">
            {tmdbReviews.map((review, i) => (
              <div key={i} className="border rounded mx-1 my-3 p-3">
                <div className="d-flex align-items-center">
                  {review.author_details.avatar_path ? (
                    <div className="review-profile-pic p-0">
                      <img
                        src={
                          review.author_details.avatar_path.includes("http")
                            ? review.author_details.avatar_path.slice(1)
                            : `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                        }
                        alt="author avatar"
                        className="img-fluid w-100 h-100"
                      />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center no-avatar review-profile-pic bg-secondary">
                      <i className="bi bi-person-fill fs-1"></i>
                    </div>
                  )}
                  <div className="text-start ms-4">
                    <h3 className="mb-0 me-2">
                      A review writen by{" "}
                      {review.author_details.name
                        ? review.author_details.name
                        : review.author_details.username}
                    </h3>

                    <p className="text-start m-0">
                      Written by{" "}
                      <strong>
                        {review.author_details.name
                          ? review.author_details.name
                          : review.author_details.username}
                      </strong>{" "}
                      on{" "}
                      {new Date(review.created_at).toLocaleDateString(
                        {},
                        {
                          timeZone: "UTC",
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                    {review.author_details.rating && (
                      <StyledRating
                        readOnly
                        className="mt-2"
                        size="large"
                        name="simple-controlled"
                        value={review.author_details.rating}
                      />
                    )}
                  </div>
                </div>
                <p className="review-content mt-4 text-start">
                  {review.content}
                </p>
              </div>
            ))}
            {reviews.map((review, i) => (
              <div
                key={i}
                className="border rounded mx-1 my-3 p-3 animate__animated animate__zoomIn"
              >
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center no-avatar review-profile-pic bg-secondary">
                    <i className="bi bi-person-fill fs-1"></i>
                  </div>
                  <div className="text-start ms-4">
                    <h3 className="mb-0 me-2">
                      A review writen by {review.username}
                    </h3>

                    <p className="text-start m-0">
                      Written by <strong>{review.username}</strong> on{" "}
                      {new Date(review.createdAt).toLocaleDateString(
                        {},
                        {
                          timeZone: "UTC",
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                    {review.rating && (
                      <StyledRating
                        readOnly
                        className="mt-2"
                        size="large"
                        name="simple-controlled"
                        value={review.rating}
                      />
                    )}
                  </div>
                </div>
                <p className="review-content mt-4 text-start">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no reviews for this movie yet.</p>
        )}
        <hr className="mt-5" />

        <div className="form-container position-relative">
          <div
            className={`reviews-loader-container position-absolute w-100 h-100 animate__animated animate__fadeIn ${
              reviewLoader ? "d-flex" : "d-none"
            }`}
          >
            <div className="reviews-loader animate__animated animate__zoomIn">
              <Spinner animation="border" variant="danger" />
              <p className="text-dark fw-bold mt-2 mb-0">Posting review...</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 rounded d-flex flex-column animate__animated animate__fadeIn"
          >
            <input
              className="bg-dark border-bottom border-secondary w-25 text-white p-2"
              autoComplete="off"
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", {
                required: false,
              })}
            />
            <div className="d-flex align-items-center">
              <p className="mb-0 me-1 fs-4 pb-1">Rate this movie:</p>
              <StyledRating
                id="rating"
                className="my-4 me-2"
                size="large"
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => handleRating(event, newValue)}
              />
            </div>
            <textarea
              className="bg-dark w-100 rounded text-white p-2"
              rows="5"
              autoComplete="off"
              id="content"
              type="text-area"
              name="content"
              placeholder="What do you think about this movie?"
              {...register("content", {
                required: true,
              })}
            ></textarea>
            {errors.content && (
              <span className="f-roboto fs-7 text-danger d-block">
                This field is required
              </span>
            )}
            <button className="ms-auto btn btn-danger mt-4">Post review</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reviews;
