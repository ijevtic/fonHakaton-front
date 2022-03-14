import React from 'react';
import Moment from 'react-moment';
import { Button, Card, CardBody, CardFooter, CardImg, Col, Row } from 'reactstrap';
import ActionModal from './ActionModal';
import ModalQR from './ModalQR';
import ModalQRScan from './ModalQRScan';

export default function ActionCard(props) {
    let [qr, setQr] = React.useState(false);
    let [qrToken, setQrToken] = React.useState('');
    let [scanQr, setScanQr] = React.useState(false);
    let { akcija } = props;
    let [actionModal, setActionModal] = React.useState(false);
    let [akcijaZaModal, setAkcijaZaModal] = React.useState(null);

    const loadQrToken = () => {
        fetch(process.env.REACT_APP_SERVER + "actions/qr", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                actionId: akcija.id_akcije
            })
        })
            .then(res => {
                if (res.status === 200)
                    return res.json();
            })
            .then(data => {
                setQrToken(data.qr_token);
                setQr(true);
            })
    }

    return (
        <Card style={{ width: '100%' }}>
            <ModalQR open={qr} toggle={() => setQr(false)} qrToken={qrToken} />
            <ModalQRScan open={scanQr} toggle={() => setScanQr(false)} />
            <ActionModal open={actionModal} akcija={akcijaZaModal} toggle={() => setActionModal(false)} />
            <CardImg top width="20" src={akcija.slika || 'https://images.evetech.net/characters/2113452255/portrait?size=512'} />
            <h3 className='bold mt-3 mb-2 ml-4'>{akcija.naziv}</h3>
            {/* <CCardHeader>{akcija.vreme}</CCardHeader>
            <CCardTitle><h2>{akcija.naziv}</h2></CCardTitle>
            <CCardBody>
                {akcija.opis}
            </CCardBody>
            <CCardSubtitle>gascina ide gaaaas</CCardSubtitle> */}
            <CardFooter style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button onClick={() => {
                    setActionModal(true);
                    setAkcijaZaModal(akcija);
                }} block color='success'>
                    <i className='fas fa-list mr-2'></i>
                    Detalji
                </Button>
                {akcija.prijavljen &&
                    <Button onClick={loadQrToken} block color='success'>
                        <i className='fas fa-qrcode mr-2'></i>
                        Otvori QR kod
                    </Button>
                }
                {akcija.autor == localStorage.getItem("username") &&
                    <Button onClick={() => {
                        setScanQr(true);
                    }} block color='primary'>
                        <i className='fas fa-camera mr-2'></i>
                        Skeniraj QR kod
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}