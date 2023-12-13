import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import FlashCards from '../components/FlashCards';
import { getPracticeCards, getPracticeModeNames } from '../utils/cards';
import { getLanguageNames, getWordTypeNames } from '../utils/language';
import { getPaddingStyle } from '../utils/style';
import { getUserProfile } from '../utils/user';

const DEFAULT_PRACTICE_MODE_ID = "1";
const NUM_CARDS_OPTIONS = [10, 25, 50];
const NUM_CARDS_DEFAULT = 25;
const userNameStyle = {
  fontWeight: "700",
  fontSize: "large"
}

export default function PracticeCards(props) {
  const [loadedUserprofile, setLoadedUserprofile] = useState(false);
  const [languageId, setLanguageId] = useState(0);
  const [languageIds, setLanguageIds] = useState([]);
  const [languageNamesMap, setLanguageNamesMap] = useState({});
  const [practiceModeId, setPracticeModeId] = useState(DEFAULT_PRACTICE_MODE_ID);
  const [practiceModeNamesMap, setPracticeModeNamesMap] = useState({});
  const [numCards, setNumCards] = useState(NUM_CARDS_DEFAULT);
  const [isPracticing, setIsPracticing] = useState(false);
  const [cards, setCards] = useState([]);
  const [typeNamesMap, setTypeNamesMap] = useState({});
  const [cardIdx, setCardIdx] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  useEffect(() => {
    if (!loadedUserprofile) {
      getUserProfile(props.userSecret).then(data => {
        setLoadedUserprofile(true)
        setLanguageId(data.defaultLanguageId);
        setLanguageIds(data.languageIds);
        getLanguageNames(props.userSecret).then(data => setLanguageNamesMap(data));
        getPracticeModeNames(props.userSecret).then(data => setPracticeModeNamesMap(data));
        getWordTypeNames(props.userSecret).then(data => setTypeNamesMap(data));
      });
    }
  });
  const startPracticing = () => {
    const config = {practiceModeId: practiceModeId, numCards: numCards};
    getPracticeCards(props.userSecret, languageId, config).then(cards => {
      if (cards.length > 0) {
        setCards(cards);
        setIsPracticing(true);
      }
    })
  };
  const flashCards = cards.length === 0 ? <Container/>
    : <FlashCards userSecret={props.userSecret} languageId={languageId} cards={cards} typeNamesMap={typeNamesMap} resetCards={() => {setCards([]); setIsPracticing(false)}} />;
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Col xs={6} md={2}>
          <Form.Select value={languageId} onChange={(event) => setLanguageId(event.target.value)} >
            {languageIds.map(
              id => <option key={id} value={id}>{languageNamesMap[id]}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={practiceModeId} onChange={(event) => setPracticeModeId(event.target.value)} >
            {Object.keys(practiceModeNamesMap).map(
              id => <option key={id} value={id}>{practiceModeNamesMap[id]}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={12} className="d-block d-sm-none" style={getPaddingStyle(10)} />
        <Col xs={6} md={2}>
          <Form.Select value={numCards} onChange={(event) => setNumCards(event.target.value)} >
            {NUM_CARDS_OPTIONS.map(
              n => <option key={n} value={n}>{n} Cards</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Button variant="primary" disabled={isPracticing} onClick={startPracticing} >
             Practice
          </Button>
        </Col>
      </Row>
      {flashCards}
    </Container>
  );
}
