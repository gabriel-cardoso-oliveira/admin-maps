import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '~/assets/logo-purple.png';
import { Container, Content, Profile } from './styles';
import Notifications from '~/components/Notifications';
import Menu from '~/components/Menu';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="CampoTV Maps" />
          {/* <Link to="/dashboard">DASHBOARD</Link> */}
          <Menu />
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                `https://api.adorable.io/avatars/50/abott@adorable.png`
              }
              alt="Profile"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}