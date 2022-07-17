import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  readStorageUserData,
  clearLocalStorage,
} from '../services/userLocalStorage';

function Profile() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    setEmail(readStorageUserData().email);
  }, []);

  const handlePush = (pathName) => {
    if (pathName === '/') {
      clearLocalStorage();
    }

    history.push(pathName);
  };

  return (
    <div>
      <Header pageTitle="Profile" showSearchIcon={ false } />
      <h4 data-testid="profile-email">{email}</h4>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => handlePush('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => handlePush('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => handlePush('/') }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
