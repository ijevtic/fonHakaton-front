import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Modal, ModalBody } from 'reactstrap';

export default function ModalQRScan(props) {

    const handleScan = (data) => {
        if(!data) return;
        fetch(process.env.REACT_APP_SERVER + "actions/scan-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                qrToken: data.text
            })
        })
        .then(() => {
            alert("Uspešno ste skenirali kod!");
            props.toggle();
        })
    }

    const handleError = (err) => {
        alert(err);
    }

    return (
        <Modal isOpen={props.open} toggle={props.toggle}>
            <ModalBody>
                <QrReader
                    constraints={{
                        facingMode: "environment"
                    }}
                    onResult={(result, error) => {
                        if (!!result) {
                            handleScan(result);
                        }
              
                        if (!!error) {
                          console.info(error);
                        }
                      }}
                      style={{ width: '100%' }}
                />
            </ModalBody>
        </Modal>
    )
}