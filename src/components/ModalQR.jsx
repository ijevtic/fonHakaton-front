import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
var QRCode = require('qrcode.react');

export default function ModalQR(props) {
    return (
        <Modal isOpen={props.open} toggle={props.toggle}>
            <ModalHeader>
                QR potvrda
            </ModalHeader>
            <ModalBody style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p align='center'>Pokažite organizatoru ovaj QR kod kako bi evidentirali Vaš dolazak na akciju.</p>
                <div style={{
                    borderRadius: 10,
                    padding: 20,
                    backgroundColor: 'white',
                    marginTop: 10,
                }}>
                    <QRCode value={props.qrToken} size={256} />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Zatvori</Button>
            </ModalFooter>
        </Modal>
    )
}