import { Modal, Button } from "react-bootstrap";
import "./ModalMovie.css";
import ReactStars from "react-rating-stars-component";

function ModalMovie({ handleClose, show, movie }) {
  return (
    <>
      {movie && (
        <Modal
          className="text-white"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header className="bg-dark text-white" closeButton>
            <Modal.Title>
              <h2>{movie.title}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <div className="container">
              <div className="row">
                <div className="col-6 modal-poster">
                  <img
                    className="img-fluid"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </div>
                <div className="col-6">
                  <h3 className="fs-5">Plot</h3>
                  {movie.overview}
                  <ReactStars
                    edit={false}
                    count={5}
                    size={40}
                    activeColor="#ffd700"
                    value={Math.round(movie.vote_average / 2)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalMovie;
