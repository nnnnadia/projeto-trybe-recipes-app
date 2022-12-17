import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
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
    <Container maxWidth="xs">
      <Header pageTitle="Profile" showSearchIcon={ false } />
      <Grid
        container
        justifyContent="center"
        sx={ { marginTop: '15px' } }
      >
        <Typography variant="overline" data-testid="profile-email">{email}</Typography>
        <ProfileMenu />
        <Footer />
      </Grid>
    </Container>
  );
}

export default Profile;
