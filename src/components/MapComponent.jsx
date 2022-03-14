import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import { fitBounds } from 'google-map-react';
import ActionModal from './ActionModal';

export class MapContainer extends Component {

  state = {
    zoom: 14,
    center: {
      lat: 44.818,
      lng: 20.457
    },
    bounds: {},
    akcijaKlik: null,
    modalAkcija: false
  }

  centriraj = () => {
    var { akcije } = this.props;
    var bounds = new this.props.google.maps.LatLngBounds();
    akcije.forEach(function (akcija) {
      bounds.extend(new this.props.google.maps.LatLng(akcija.latitude, akcija.longitude));
    }.bind(this));
    this.setState({
      bounds: bounds
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.akcije !== this.props.akcije) {
      this.centriraj();
    }
  }

  render() {
    let { akcije } = this.props;
    return (
      <>
        <ActionModal ucitajAkcije={this.props.ucitajAkcije} open={this.state.modalAkcija} toggle={() => this.setState({ modalAkcija: !this.state.modalAkcija })} akcija={this.state.akcijaKlik} />
        <Map style={{ borderRadius: 7.5 }} google={this.props.google} initialCenter={{
          lat: 44.818,
          lng: 20.457
        }} zoom={14} bounds={this.state.bounds}
        
        >
          {
            akcije.map(akcija => {
              return (
                <Marker
                  key={akcija.id}
                  position={{ lat: akcija.latitude, lng: akcija.longitude }}
                  onClick={() => {
                    this.setState({
                      akcijaKlik: akcija,
                      modalAkcija: true
                    });
                  }}
                />
              )
            })
          }
        </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAPS_API_KEY)
})(MapContainer)