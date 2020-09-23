import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Badge, NotificationList, Scroll, ListMenu } from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <strong>MENU</strong>
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          <ListMenu key="dashboard">
            <Link onClick={handleToggleVisible} to="/dashboard">
              DASHBOARD
            </Link>
          </ListMenu>

          <ListMenu key="users">
            <Link onClick={handleToggleVisible} to="/users">
              USUÁRIOS
            </Link>
          </ListMenu>
        </Scroll>
      </NotificationList>
    </Container>
  );
}
