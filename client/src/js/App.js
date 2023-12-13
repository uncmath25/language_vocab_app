import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Login from './components/Login';
import AddEditCard from './views/AddEditCard';
import { LOGIN, PRACTICE_CARDS, REVIEW_CARDS, ADD_EDIT_CARD } from './views/catalog';
import PracticeCards from './views/PracticeCards';
import ReviewCards from './views/ReviewCards';

import { getUserProfile } from './utils/user';

export default function App() {
  const [currentView, setViewPage] = useState(LOGIN);
  const [userSecret, setUserSecret] = useState(null);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (userSecret === null) {
      setViewPage(LOGIN);
    }
  });
  const header = <Header userSecret={userSecret} setUserSecret={setUserSecret} currentView={currentView} setViewPage={setViewPage} />;
  const login = <Login setUserSecret={setUserSecret} setViewPage={setViewPage} />;
  const practiceCards = <PracticeCards userSecret={userSecret} />;
  const reviewCards = <ReviewCards userSecret={userSecret} />;
  const addEditCard = <AddEditCard userSecret={userSecret} />;
  const chooseView = (view, secret) => {
    if (secret === null) {
      return login;
    }
    switch(view) {
      case PRACTICE_CARDS:
        return practiceCards;
      case REVIEW_CARDS:
        return reviewCards;
      case ADD_EDIT_CARD:
        return addEditCard;
    }
  };
  return (
    <div>
      {header}
      {chooseView(currentView, userSecret)}
    </div>
  );
}
