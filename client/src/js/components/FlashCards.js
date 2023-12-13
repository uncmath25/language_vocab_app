import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import playSoundImage from '../../assets/play_sound.png';
import { FAMILIARITY_MAP, updateCard } from '../utils/cards';
import { playText } from '../utils/speech';
import { getPaddingStyle } from '../utils/style';

const ALERT_TIMEOUT_MS = 1000;

export default function FlashCards(props) {
  const cards = props.cards;
  const [cardIdx, setCardIdx] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [familiarty, setFamiliarity] = useState(cards[cardIdx].familiarity);
  const [updateFamiliarityMessage, setUpdateFamiliarityMessage] = useState("");
  const [updateFamiliarityMessageVariant, setUpdateFamiliarityMessageVariant] = useState("danger");
  const updateFamiliarity = (newScore) => {
    cards[cardIdx].familiarity = newScore;
    setFamiliarity(newScore);
    updateCard(props.userSecret, props.languageId, cards[cardIdx]).then(response => {
      if (response.success) {
        setUpdateFamiliarityMessage("Successfully updated familiarity");
        setUpdateFamiliarityMessageVariant("success");
      } else {
        setUpdateFamiliarityMessage("Failed to update familiarity!");
        setUpdateFamiliarityMessageVariant("danger");
      }
      setTimeout(() => setUpdateFamiliarityMessage(""), ALERT_TIMEOUT_MS);
    });
  };
  const showPreviousCard = () => {
    setShowTranslation(false);
    setCardIdx(cardIdx - 1);
    setFamiliarity(cards[cardIdx - 1].familiarity);
  };
  const showNextCard = () => {
    setShowTranslation(false);
    setCardIdx(cardIdx + 1);
    setFamiliarity(cards[cardIdx + 1].familiarity);
  };
  const resetCards = () => {
    props.resetCards();
    setCardIdx(0);
  };
  const playWordSound = () => {
    playText(cards[cardIdx].word, props.languageId);
  };
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Col xs={12} md={6}>
        <Card border="dark" onClick={() => setShowTranslation(!showTranslation)} >
        <Card.Header style={{fontSize: "48px"}}>{cards[cardIdx].word}</Card.Header>
          <Card.Body>
            <Card.Title style={{fontSize: "36px", fontWeight: "300",}} >{showTranslation ? cards[cardIdx].translation : ""}</Card.Title>
            <br />
            <Card.Text style={{fontSize: "24px", fontWeight: "100",}} >{showTranslation ? props.typeNamesMap[cards[cardIdx].typeId] : ""}</Card.Text>
            <br />
            <Card.Text style={{fontSize: "24px", fontWeight: "100",}} >{showTranslation ? cards[cardIdx].details : ""}</Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Col xs={4} md={1}>
          <Button variant="primary" disabled={cardIdx <= 0} onClick={() => showPreviousCard()} >
             Previous
          </Button>
        </Col>
        <Col xs={4} md={1}>
          <Button variant="primary" disabled={cardIdx >= cards.length - 1} onClick={() => showNextCard()} >
             Next
          </Button>
        </Col>
        <Col xs={4} md={1} style={{fontSize: "24px", fontWeight: "700",}}>
          {cardIdx + 1} / {cards.length}
        </Col>
        <Col xs={12} className="d-block d-sm-none" style={getPaddingStyle(10)} />
        <Col xs={8} md={2}>
          <Form.Select value={familiarty} onChange={(event) => updateFamiliarity(event.target.value)} >
            {Object.keys(FAMILIARITY_MAP).map(
              s => <option key={FAMILIARITY_MAP[s]} value={s}>{FAMILIARITY_MAP[s]}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={4} md={1} >
          <Button variant="warning" onClick={() => playWordSound()} >
            <img src={playSoundImage} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={6} md={1}>
          <Button variant="danger" onClick={() => resetCards()} >
             Finished
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Col xs={6} md={3}>
        <Alert variant={updateFamiliarityMessageVariant} show={updateFamiliarityMessage !== ""} dismissible={true} onClose={() => setUpdateFamiliarityMessage("")} >
           {updateFamiliarityMessage}
        </Alert>
      </Col>
    </Container>
  );
}
