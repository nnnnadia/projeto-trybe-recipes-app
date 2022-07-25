import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { readStorageUserData } from '../services/userLocalStorage';
import { ProfileMenu } from '../components/ProfileComponents';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(readStorageUserData().email);
  }, []);

  return (
    <div>
      <Header pageTitle="Profile" showSearchIcon={ false } />
      <Container fixed>
        <Typography variant="overline" data-testid="profile-email">{email}</Typography>
        <ProfileMenu />
      </Container>
      <Footer />
    </div>
  );
}

export default Profile;
