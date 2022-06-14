import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Trailer.css";
import { useParams } from "react-router-dom";

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
      `https://www.youtube.com/embed/${
        response.data.results[response.data.results.length - 1].key
      }`
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
        show={show}
        onHide={() => handleClose()}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <iframe
            className="trailer"
            allowFullScreen={true}
            frameBorder="0"
            src={trailer}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Trailer;
