import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

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
          <Marker
            position={{ lat: -34.397, lng: 150.644 }}
            onClick={this.onToggleOpen}
          >
            {this.state.isOpen ?
                <InfoWindow>
                  <div>InfoWindow</div>
                </InfoWindow>
            :
            null}
          </Marker>
        </GoogleMap>
    );
  }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));