import React from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import 'react-google-places-autocomplete/dist/index.min.css';

export function AutocompleteInput({onSelect, defaultValue = '', classes = '', placeholder = 'Address'}) {

  const select = (data) => {
    geocodeByAddress(data.description)
      .then(results => {
        getLatLng(results[0]).then(({ lat, lng }) => {
            onSelect({ lat, lng, description:data.description })
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <GooglePlacesAutocomplete
      apiKey={'AIzaSyDtmi_xOfrLovK8fPxmMpemUOudgnTUhVo'}
      autocompletionRequest={{
      componentRestrictions: {
        country: ['am'],
      }
    }} debounce={0} inputStyle={{boxShadow: 'none'}} placeholder={placeholder} inputClassName={classes} initialValue={defaultValue} onSelect={select}/>
  );
}
