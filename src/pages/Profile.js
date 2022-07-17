import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { readStorageUserData } from '../services/userLocalStorage';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(readStorageUserData().email);
  }, []);

  return (
    <div>
      <Header pageTitle="Profile" showSearchIcon={ false } />
      <h4 data-testid="profile-email">{email}</h4>
      <button type="button" data-testid="profile-done-btn">
        Receitas feitas
      </button>
      <button type="button" data-testid="profile-favorite-btn">
        Receitas favoritas
      </button>
      <button type="button" data-testid="profile-logout-btn">
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
