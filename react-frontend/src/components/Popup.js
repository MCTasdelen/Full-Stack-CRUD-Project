import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link ,useParams} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import ClientService from '../services/ClientService'

function Popup(props) {
    
    
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Hizmetler
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Araba Kaskosu</h5>
        <h3>{props.id}</h3>
        <button type="button" className="btn btn-outline-dark">Başvur</button>
        <br/><br/>
        <h5>Ev Kaskosu</h5><button type="button" className="btn btn-outline-dark">Başvur</button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Popup

