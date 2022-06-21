import "./Cast.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomRightArrow from "../CustomArrows/CustomRightArrow";
import CustomLeftArrow from "../CustomArrows/CustomLeftArrow";
import { Modal } from "react-bootstrap";
import missingCastImg from "../../assets/missing-cast-image.png";

function Cast({ movieId, setDirector, setWriter }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const response = await axios.get(
        `/movie/${movieId}/credits`,
        tmdbApiConfig
      );
      setCast(response.data.cast);
      setDirector(response.data.crew.filter((crew) => crew.job === "Director"));
      setWriter(
        response.data.crew.filter(
          (crew) => crew.job === "Writer" || crew.job === "Screenplay"
        )
      );
    };
    getCast();
    // eslint-disable-next-line
  }, [movieId]);
  const [showCast, setShowCast] = useState(false);
  const handleClose = () => {
    setShowCast(false);
  };

  return (
    <>
      {Object.keys(cast).length > 0 && (
        <div className="cast pe-lg-5">
          <h3 className="text-start mb-3 fs-4">Top Billed Cast</h3>

          <Carousel
            swipeable={true}
            arrows={true}
            autoPlay={false}
            infinite={true}
            shouldResetAutoplay={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 6,
                slidesToSlide: 1,
              },
              desktop2: {
                breakpoint: { max: 1530, min: 1024 },
                items: 5,
                slidesToSlide: 1,
              },
              desktop3: {
                breakpoint: { max: 1300, min: 780 },
                items: 4,
                slidesToSlide: 1,
              },
              tablet: {
                breakpoint: { max: 780, min: 651 },
                items: 3,
                slidesToSlide: 1,
              },
              mobile2: {
                breakpoint: { max: 650, min: 0 },
                items: 2,
                slidesToSlide: 1,
              },
            }}
            keyBoardControl={true}
            containerClass="carousel-container py-3 rounded"
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            itemClass="px-3"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {cast.map(
              (cast, i) =>
                i <= 10 && (
                  <div
                    key={cast.name}
                    className="cast-card w-100 text-white pb-4 rounded-3 shadow"
                  >
                    {cast.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                        className="card-img-top img-fluid w-100"
                        alt={cast.name}
                      />
                    ) : (
                      <img
                        src={missingCastImg}
                        className="card-img-top img-fluid w-100"
                        alt={cast.name}
                      />
                    )}
                    <div className="cast-card-body p-2">
                      <h5 className="cast-card-title">{cast.name}</h5>
                      <p>{cast.character}</p>
                    </div>
                  </div>
                )
            )}
          </Carousel>

          <div className="view-more-cast text-end mt-2 pe-1">
            <p onClick={() => setShowCast(true)} className="fs-5 d-inline">
              View full cast ›
            </p>
          </div>
        </div>
      )}
      <Modal size="xl" show={showCast} onHide={handleClose} centered>
        <Modal.Header
          className="bg-dark text-white border-0"
          closeButton
          closeVariant="white"
        >
          <Modal.Title>
            <h2 className="title text-start fs-2 text-danger">Cast</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row m-0 bg-dark g-2">
          {cast.map((cast, i) => (
            <div key={cast.name} className="col-3">
              <div className="full-cast-card p-0 text-white pb-4 rounded-3 shadow border border-secondary">
                {cast.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                    className="full-cast-img img-fluid w-100"
                    alt={cast.name}
                  />
                ) : (
                  <img
                    src={missingCastImg}
                    className="full-cast-img img-fluid w-100"
                    alt={cast.name}
                  />
                )}
                <div className="cast-card-body p-2">
                  <h5 className="cast-card-title">{cast.name}</h5>
                  <p>{cast.character}</p>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cast;
