import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardImage, CCardSubtitle, CCardTitle } from '@coreui/react';
import React from 'react';
import Moment from 'react-moment';
import { Button, Card, CardBody, CardFooter, CardImg, Col, Row } from 'reactstrap';
import ModalQR from './ModalQR';
import ModalQRScan from './ModalQRScan';

export default function ProfileCard(props) {

    return (
      <div className="card" style={{width: "22rem", margin:"10px"}}>
      <div className="card-header">
        {props.brojac}
      </div>
      <div className="card-body">
        <h5 className="card-title" style={{fontSize:"19px"}}>{props.akcija.naziv}</h5>
        <h6 className="card-subtitle mb-2 text-muted"><Moment format='DD.MM.YYYY. HH:mm'>{props.akcija.vreme}</Moment></h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style={{background:"#303242", font:"black"}}>Ukupno ljudi: {props.akcija.broj_prijavljenih}</li>
      </ul>
    </div>
    )
}