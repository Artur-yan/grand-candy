import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './index.scss';
import defSvg from "../../assets/svg/mapPin.svg";

export function MapContainer({google, zoom, markers= [], icon = null}) {

    return (
      <Map google={google}
        zoom={zoom}
        initialCenter={markers.length > 0 ? { lat: markers[0].lat, lng: markers[0].lng } : { lat: 40.20225, lng: 44.545018 }}>
          {markers.length > 0 &&
            markers.map((val, index) => {
              return (
                <Marker
                    key={index}
                    icon={icon ? icon : defSvg}
                    name={'Grand Candy'}
                    position={{ lat: val.lat, lng: val.lng}}>
                </Marker>
                )
              })
          }
      </Map>
    )
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtmi_xOfrLovK8fPxmMpemUOudgnTUhVo')
})(MapContainer)

