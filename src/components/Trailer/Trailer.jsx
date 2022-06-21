import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Trailer.css";
import { Link, useParams } from "react-router-dom";

function Trailer() {
  const [trailer, setTrailer] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTrailer("");
  };
  const handleShow = () => {
    getTrailer();
    setShow(true);
  };
  const params = useParams();

  const getTrailer = async () => {
    const response = await axios.get(
      `/movie/${params.id}/videos`,
      tmdbApiConfig
    );
    setTrailer(
      response.data.results.length > 0
        ? `https://www.youtube.com/embed/${
            response.data.results[response.data.results.length - 1].key
          }`
        : ""
    );
  };
  getTrailer();

  return (
    <>
      <button
        className="trailer-btn ms-2 btn btn-sm btn-danger"
        onClick={handleShow}
      >
        <i className="bi bi-play-fill"></i> Play trailer
      </button>
      <Modal
        contentClassName="trailer-modal"
        show={show}
        onHide={() => handleClose()}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {trailer ? (
            <iframe
              className="trailer"
              allowFullScreen={true}
              height="315"
              width="560"
              frameBorder="0"
              src={trailer}
              title="trailer"
            ></iframe>
          ) : (
            <div className="trailer w-100 h-100 d-flex justify-content-center align-items-center">
              <p className="text-white fs-3">
                There are no trailers available for this movie
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Trailer;
