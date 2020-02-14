import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import {AroundMarker} from './AroundMarker'
export class NormalAroundMap extends React.Component {
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          <AroundMarker
              position={{ lat: -34.397, lng: 150.644 }}
          />
          <AroundMarker
              position={{ lat: -34.327, lng: 150.614 }}
          />
          <AroundMarker
              position={{ lat: -34.357, lng: 150.624 }}
          />
        </GoogleMap>
    );
  }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));