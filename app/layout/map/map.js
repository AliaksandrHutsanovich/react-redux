import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import {
  startEditTaskProcess,
  clearReDo,
} from '../../actions';
import { getTaskByUrl } from '../../selectors';
import { getOldPathParams } from '../layoutContent/tasks/utils';

import styles from './map.css';

const accessToken = 'pk.eyJ1Ijoic2FuZGVyYXMiLCJhIjoiY2s0bGJ2aW44Mjg5NjNubzJ2NXlvMmk1eiJ9.U4UYcWGp-W0S9CeW5EFcpg';
const id = 'mapbox/streets-v11';

const WorldMap = ({
  url,
  task: {
    title,
    description,
    isFinished,
    location = {},
  },
  dispatch,
}) => {
  const { oldPath, oldPathParam } = useMemo(() => getOldPathParams(url.split('-')), [url]);
  const coords = useMemo(() => Object.values(location), [location]);
  const handleClick = useCallback((e) => {
    if (oldPath.length) {
      dispatch(clearReDo());
      dispatch(startEditTaskProcess({
        newPath: '',
        oldPath,
        oldPathParam,
        newPathParam: '',
        title,
        description,
        isFinished,
        location: e.latlng,
      }));
    }
  }, [description, dispatch, isFinished, title, oldPath, oldPathParam]);

  return (
    <Map
      className={styles.map}
      center={useMemo(() => (coords.length ? coords : [52.093, 23.695]), [coords])}
      zoom={12}
      onClick={handleClick}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery © <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
      />
      {coords.length && (
        <Marker position={coords} />
      )}
    </Map>
  );
};

WorldMap.propTypes = {
  url: PropTypes.string.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    isFinished: PropTypes.bool,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
  dispatch: PropTypes.func.isRequired,
};

WorldMap.defaultProps = {
  task: {
    location: {},
  },
};

const mapStateToProps = ({ contentDisplay, actionReducers }) => ({
  url: contentDisplay.get('url') || '',
  task: getTaskByUrl(contentDisplay.get('url'))(actionReducers).toObject(),
});

export default connect(mapStateToProps)(memo(WorldMap));
