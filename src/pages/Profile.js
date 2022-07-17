import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  useEffect(() => {}, []);

  return (
    <div>
      <Header pageTitle="Profile" showSearchIcon={ false } />
      <h4 data-testid="profile-email">tayna_sm1996@hotmail.com</h4>
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
