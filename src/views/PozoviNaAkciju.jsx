import ChooseLocationModal from 'components/ChooseLocationModal';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Form, FormGroup, Modal, Row } from 'reactstrap';

import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import DateTimePicker from 'react-datetime-picker';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function PozoviNaAkciju(props) {

    let [loading, setLoading] = React.useState(false);

    let [name, setName] = React.useState('');
    let [address, setAddress] = React.useState('');
    let [latLng, setLatLng] = React.useState({
        lat: null,
        lng: null,
    });
    let [actionDescription, setActionDescription] = React.useState('');
    let [modalLocation, setModalLocation] = React.useState(false);
    let [categories, setCategories] = React.useState([]);
    let [selectedCategory, setSelectedCategory] = React.useState(0);
    let [numPeople, setNumPeople] = React.useState(10);
    let [time, setTime] = React.useState(new Date());
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);

    const chooseLocation = () => {
        setModalLocation(true);
    }

    const [files, setFiles] = React.useState([])
    const filepondRef = React.useRef(null)

    React.useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + 'categories', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
    }, [])

    const pozoviNaAkciju = async () => {
        setLoading(true);

        try {
            await uploadSlike();
        }
        catch (e) {
            console.log(e);
        }

        let body = {
            name,
            address,
            lat: latLng.lat,
            lng: latLng.lng,
            description: actionDescription,
            id_kategorije: selectedCategory,
            numPeople: numPeople,
            time,
            slika: process.env.REACT_APP_SERVER + 'slike/' + files[0].filename,
        }

        fetch(process.env.REACT_APP_SERVER + 'actions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setLoading(false);
                    setShow(true);
                }
            });
    }

    const uploadSlike = () => {
        setLoading(true);
        if (
            files.length == 0
        ) {
            alert("Morate izabrati fotografiju.");
            setLoading(false);
            return null;
        }
        let data = new FormData();
        data.append("id", filepondRef.current.getFile().serverId);
        data.append("filename", filepondRef.current.getFile().filename);
        data.append("folder", "slike/");
        return fetch(process.env.REACT_APP_SERVER  + "filepond/submit", {
            method: "POST",
            enctype: "multipart/form-data",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token")
            },
            body: data
        });
    };

    return (
        <div className="content">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Uspešno objavljena akcija!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <ChooseLocationModal setLatLng={setLatLng} latLng={latLng} open={modalLocation} toggle={() => setModalLocation(!modalLocation)} />
            <Card style={{ padding: 20, marginBottom: 0 }}>
                <CardBody style={{ height: "calc(100vh - 210px)", overflow: 'auto' }}>
                    <Row>
                        <Col md='12' lg='4' >
                            <FilePond
                                ref={filepondRef}
                                files={files}
                                acceptedFileTypes={['image/*']}
                                labelIdle="Prevucite fotografiju ili kliknite <a style='cursor: pointer; text-decoration: underline'>ovde</a>"
                                labelButtonAbortItemProcessing="Obustavi"
                                labelButtonAbortItemLoad="Obustavi"
                                labelButtonRemoveItem="Ukloni"
                                labelFileLoading="Učitavanje..."
                                labelFileProcessing="Učitavanje"
                                labelTapToCancel="Kliknite da obustavite"
                                labelTapToRetry="Kliknite da pokušate ponovo"
                                labelTapToUndo="Kliknite da uklonite fajl"
                                labelFileProcessingComplete="Gotovo"
                                labelFileTypeNotAllowed="Neispravan fajl"
                                fileValidateTypeLabelExpectedTypes="Očekuje se fotografija"
                                onupdatefiles={setFiles}
                                allowMultiple={false}
                                stylePanelLayout={{
                                    color: 'red'
                                }}
                                server={{
                                    url: process.env.REACT_APP_SERVER + "filepond/",
                                    process: {
                                        headers: {
                                            "Authorization": "Bearer " + window.localStorage.getItem("token")
                                        }
                                    }
                                }}
                            />
                        </Col>
                        <Col md='12' lg='8'>
                            <Form>
                                <FormGroup>
                                    <label>Naziv akcije</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                </FormGroup>

                                <FormGroup>
                                    <label>Adresa</label>
                                    <input type="text" className="form-control" value={address} onChange={(e) => {
                                        setAddress(e.target.value);
                                    }} />
                                </FormGroup>

                                <FormGroup>
                                    <label>Datum i vreme</label>
                                    <DateTimePicker className={"datepicker"} onChange={setTime} value={time} />

                                </FormGroup>

                                <FormGroup>
                                    <label>Kategorija akcije</label>
                                    <select className="form-control" value={selectedCategory} onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                    }}>
                                        <option disabled value={0}>Izaberite kategoriju</option>
                                        {categories.map((category, index) => {
                                            return (
                                                <option key={index} value={category.id_kategorije}>{category.naziv_kategorije}</option>
                                            )
                                        })}
                                    </select>
                                </FormGroup>


                                <FormGroup>
                                    <label>Lokacija na mapi</label>
                                    <Button block size="sm" onClick={chooseLocation} color={latLng.lat ? "success" : "primary"}>
                                        {latLng.lat ? "Lokacija odabrana" : "Odabir lokacije"}
                                    </Button>
                                </FormGroup>

                                <FormGroup>
                                    <label>Potreban broj ljudi</label>
                                    <input type="number" className="form-control" value={numPeople} onChange={(e) => {
                                        setNumPeople(e.target.value);
                                    }} />
                                </FormGroup>

                                <FormGroup>
                                    <label>Opis akcije</label>
                                    <input type="textarea" rows={50} className="form-control" value={actionDescription} onChange={(e) => {
                                        setActionDescription(e.target.value);
                                    }} />
                                </FormGroup>

                            </Form>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter style={{ padding: 0 }}>
                    <Button onClick={pozoviNaAkciju} block>Pozovi na akciju!</Button>
                </CardFooter>
            </Card>
        </div>
    )
}