import React from 'react';
import PropTypes from 'prop-types';
import { FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const DrawComponent = ({ position }) => (
  <FeatureGroup>
    <EditControl
      position={position}
      // onEdited={this._onEditPath}
      // onCreated={this._onCreate}
      // onDeleted={this._onDeleted}
      draw={{
        rectangle: false,
      }}
    />
    <Circle center={[51.51, -0.06]} radius={200} />
  </FeatureGroup>
);

DrawComponent.propTypes = {
  position: PropTypes.string,
};

DrawComponent.defaultProps = {
  position: 'topleft',
};

export default DrawComponent;
