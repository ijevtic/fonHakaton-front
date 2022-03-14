import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import markerCrveni from "assets/img/markerCrveni.png";

import GoogleMapReact from 'google-map-react';


export default class ChooseLocationModal extends Component {

    state = {
        lat: 44,
        lng: 20,
        dragging: false,
    }

    componentDidMount() {
        this.setState({
            lat: this.props.latLng.lat || 44,
            lng: this.props.latLng.lng || 20,
        })
    }

    onMarkerMouseDown = (props, marker, e) => {
        this.setState({
            dragging: true,
        });
    }

    mouseMove = (props, marker, e) => {
        if (this.state.dragging) {
            this.setState({
                lat: e.lat - 0.001,
                lng: e.lng,
            });
        }
    }


    render() {
        return (
            <Modal size='xl' isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalBody style={{ height: '85vh', padding: 0 }}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <GoogleMapReact
                        onClick={(e) => {
                            this.setState({
                                lat: e.lat,
                                lng: e.lng,
                            })
                        }}
                            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                            defaultCenter={{
                                lat: this.state.lat,
                                lng: this.state.lng,
                            }}
                            defaultZoom={14}
                            draggable={!this.state.dragging}
                            onChildMouseMove={this.mouseMove}

                        >
                            <img style={{
                                cursor: "pointer",
                                position: "fixed",
                                transform: "translate(-50%, -100%)"
                            }} src={markerCrveni} lat={this.state.lat} lng={this.state.lng} onMouseDown={() => {
                                this.setState({ dragging: true });
                            }} onMouseUpCapture={() => this.setState({ dragging: false })} />
                        </GoogleMapReact>
                        <Button style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }} onClick={() => {
                            this.props.setLatLng({ lat: this.state.lat, lng: this.state.lng });
                            this.props.toggle();
                        }}>
                            <i className="fas fa-check mr-1" />
                            Odaberi</Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}