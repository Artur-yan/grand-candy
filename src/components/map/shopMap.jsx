import React from 'react'
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import './index.scss';
import mapPinLg from "../../assets/svg/mapPinLg.svg";
import mapPin from "../../assets/svg/mapPin.svg";

export class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,
    title: '',
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      title: props.title,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  componentDidMount() {
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps);
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    return (
      <Map google={this.props.google}
        onClick={this.onMapClicked}
        zoom={this.props.zoom}
        initialCenter={
          this.props.center
            ?
            { lat: this.props.center.lat, lng: this.props.center.lng }
            : { lat: 40.177200, lng: 44.503490 }}>
          {this.props.markers.length > 0 &&
          this.props.markers.map((val, index) => {

            return <Marker
              key={index}
              icon={mapPinLg}
              title={val.title}
              name={'Grand Candy'}
              onClick={this.onMarkerClick}
              position={{lat: val.lat, lng: val.lng}}>
            </Marker>;
          })
          }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="P-map-address">
            <img src={mapPin} alt=""/>
            <div className='P-branch-title'>{this.state.title}</div>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtmi_xOfrLovK8fPxmMpemUOudgnTUhVo')
})(MapContainer)
