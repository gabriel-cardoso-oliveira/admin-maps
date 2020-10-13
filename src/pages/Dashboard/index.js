import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import io from 'socket.io-client';
import api from '~/services/api';
import { pointCompany } from '~/utils/icons';
import { Container } from './styles';
import './styles.css';

export default function Dashboard() {
  const [locations, setLocations] = useState([]);

  const socket = io('https://quantum-balm-274511.uc.r.appspot.com', {
    transports: ['websocket'],
  });

  async function getLocations() {
    const { data, status } = await api.get('users-locations');

    if (status === 200) {
      setLocations(data);
    }
  }

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    socket.on('locations', location => {
      if (Object.keys(location).length) {
        const index = locations.indexOf(
          locations.filter(loc => loc.email === location.email)[0]
        );

        if (index !== -1) {
          locations.splice(index, 1, location);
          return setLocations([...locations]);
        }

        setLocations([...locations, location]);
      }
    });
  }, [locations, socket]);

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
            <Marker position={[location.latitude, location.longitude]}>
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
