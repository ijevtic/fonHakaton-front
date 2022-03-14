import React from 'react';
import Moment from 'react-moment';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';

export default function ActionModal(props) {
    let [loading, setLoading] = React.useState(false);

    let { akcija } = props;
    if (!akcija) return "";

    console.log("sad sam u ActionModal")
    console.log(akcija)


    const prijaviSe = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER + "actions/checkin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                actionId: akcija.id_akcije
            })
        })
        .then((res) => {
            if (res.status === 200) {
                props.ucitajAkcije();
                props.toggle();
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const odjaviSe = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER + "actions/cancel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                actionId: akcija.id_akcije
            })
        })
        .then((res) => {
            if (res.status === 200) {
                props.ucitajAkcije();
                props.toggle();
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }


    return (
        <Modal
            scrollable
            id="actionModal"
            size={'xl'}
            isOpen={props.open}
            toggle={props.toggle}
        >
            <ModalHeader close={<h6></h6>} toggle={props.toggle}>
                {props.akcija.naziv}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md='12' lg='4'>
                        <img src={akcija.slika} />
                    </Col>
                    <Col md='12' lg='8'>
                        <h2 className="mb-2">{akcija.naziv}</h2>
                        <hr />
                        <p><i className='fas fa-fw fa-clock text-success mr-2' />Kad? <b><Moment format='DD.MM.YYYY. HH:mm'>{akcija.vreme}</Moment></b></p>
                        <p><i className='fas fa-fw fa-map text-danger mr-2' />Gde? <b>{akcija.adresa}</b></p>
                        <Progress animated value={akcija.broj_prijavljenih * 100 / akcija.broj_ljudi} />
                        <span style={{ textAlign: 'center' }}>Prijavljeno {akcija.broj_prijavljenih} od {akcija.broj_ljudi} potrebnih učesnika</span>
                        <hr />
                        <p>{akcija.opis}</p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={loading}
                    color={akcija.prijavljen ? "danger" : "success"}
                    onClick={akcija.prijavljen ? odjaviSe : prijaviSe}
                >
                    {akcija.prijavljen ?  <i className="fas fa-fw fa-times mr-2"></i> :  <i className="fas fa-fw fa-check mr-2"></i> }
                   
                    {akcija.prijavljen ? "Odjavi se" : "Prijavi se"}
                </Button>
                <Button onClick={props.toggle}>
                    Zatvori
                </Button>
            </ModalFooter>
        </Modal>
    )
}