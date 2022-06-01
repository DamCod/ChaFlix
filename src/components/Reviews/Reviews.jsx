import "./Reviews.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviewsData = await axios.get(
        `/movie/${movieId}/reviews`,
        tmdbApiConfig
      );
      console.log(reviewsData.data.results);
      setReviews(reviewsData.data.results);
    };
    getReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 && (
        <div className="reviews-container mt-5 px-5">
          <h3 className="text-start mb-3 fs-3">Reviews</h3>
          <div className="review-container scroll px-3 rounded-3">
            {reviews.map((review, i) => (
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
                  <div className="ms-4">
                    <div className="d-flex">
                      <h3 className="mb-0 me-2">
                        A review writen by{" "}
                        {review.author_details.name
                          ? review.author_details.name
                          : review.author_details.username}
                      </h3>
                      {review.author_details.rating && (
                        <Badge pill bg="danger" className="fs-5">
                          <i className="bi bi-star-fill"></i>{" "}
                          {review.author_details.rating}.0
                        </Badge>
                      )}
                    </div>
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
                  </div>
                </div>
                <p className="review-content mt-4 text-start">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
