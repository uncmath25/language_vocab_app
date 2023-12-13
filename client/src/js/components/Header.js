import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';

const LOGO = require('../../assets/logo.ico');
import { PRACTICE_CARDS, REVIEW_CARDS, ADD_EDIT_CARD } from '../views/catalog';
import { getPaddingStyle } from '../utils/style';
import { getUserProfile } from '../utils/user';

const TITLE = 'Language Learning App';
const userNameStyle = {
  fontWeight: "100",
  fontSize: "medium"
}

export default function Header(props) {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (props.userSecret === null) {
      setUserName("");
    } else {
      if (userName === "") {
        getUserProfile(props.userSecret).then(data => {
          setUserName(data.name);
        });
      }
    }
  });
  const logoutButton = props.userSecret === null ? <div/> : <Button variant="danger" onClick={() => props.setUserSecret(null)}>Logout</Button>;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <span style={getPaddingStyle(5)} />
        <img
          alt=""
          src={LOGO}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span style={getPaddingStyle(5)} />
        {TITLE}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link key={PRACTICE_CARDS} active={props.currentView === PRACTICE_CARDS} onClick={() => props.setViewPage(PRACTICE_CARDS)}>Practice Cards</Nav.Link>
          <Nav.Link key={REVIEW_CARDS} active={props.currentView === REVIEW_CARDS} onClick={() => props.setViewPage(REVIEW_CARDS)}>Review Cards</Nav.Link>
          <Nav.Link key={ADD_EDIT_CARD} active={props.currentView === ADD_EDIT_CARD} onClick={() => props.setViewPage(ADD_EDIT_CARD)}>Add / Edit Card</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand style={userNameStyle}>
        {userName}
      </Navbar.Brand>
      <Navbar.Brand>
        {logoutButton}
      </Navbar.Brand>
    </Navbar>
  );
}
