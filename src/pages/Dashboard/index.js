import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import io from 'socket.io-client';
import { pointCompany } from '~/utils/icons';
import { Container } from './styles';
import './styles.css';

export default function Dashboard() {
  const [locations, setLocations] = useState([]);

  const socket = io('https://quantum-balm-274511.uc.r.appspot.com', {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('locations', location => {
      if (location.length) setLocations(location);
    });
  }, [socket]);

  return (
    <div id="page-dashboard">
      <Container>
        <Map center={[-16.715648, -49.274597]} zoom={15}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[-16.715648, -49.274597]} icon={pointCompany}>
            <Popup>CampoTV</Popup>
          </Marker>

          <Circle
            center={[-16.715648, -49.274597]}
            fillColor="#008c3b"
            radius={200}
          >
            <Popup>CampoTV</Popup>
            <Tooltip direction="bottom" sticky offset={[0, 20]} opacity={1}>
              CampoTV
            </Tooltip>
          </Circle>

          {locations.map(location => (
            <Marker position={[location.lat, location.lon]}>
              <Popup>{location.name}</Popup>
              <Tooltip direction="bottom" sticky offset={[0, 20]} opacity={1}>
                {location.name}
              </Tooltip>
            </Marker>
          ))}
        </Map>
      </Container>
    </div>
  );
}
