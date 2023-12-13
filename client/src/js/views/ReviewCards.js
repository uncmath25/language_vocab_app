import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import CardsTable from '../components/CardsTable';
import { FAMILIARITY_MAP, getReviewCards } from '../utils/cards';
import { getLanguageNames, getWordTypeNames } from '../utils/language';
import { getPaddingStyle } from '../utils/style';
import { getUserProfile } from '../utils/user';

const DEFAULT_FAMILIARITY = 0;
const NUM_CARDS_OPTIONS = [25, 100, 500];
const NUM_CARDS_DEFAULT = 25;

export default function ReviewCards(props) {
  const [loadedUserprofile, setLoadedUserprofile] = useState(false);
  const [languageId, setLanguageId] = useState(0);
  const [languageIds, setLanguageIds] = useState([]);
  const [languageNamesMap, setLanguageNamesMap] = useState({});
  const [familiarity, setFamiliarity] = useState(DEFAULT_FAMILIARITY);
  const [numCards, setNumCards] = useState(NUM_CARDS_DEFAULT);
  const [cards, setCards] = useState([]);
  const [typeNamesMap, setTypeNamesMap] = useState({});
  useEffect(() => {
    if (!loadedUserprofile) {
      getUserProfile(props.userSecret).then(data => {
        setLoadedUserprofile(true)
        setLanguageId(data.defaultLanguageId);
        setLanguageIds(data.languageIds);
        getLanguageNames(props.userSecret).then(data => setLanguageNamesMap(data));
        getWordTypeNames(props.userSecret).then(data => setTypeNamesMap(data));
      });
    }
  });
  const startReviewing = () => {
    const config = {familiarity: familiarity, numCards: numCards};
    getReviewCards(props.userSecret, languageId, config).then(cards => {
      setCards(cards);
    })
  };
  const cardsTable = cards.length === 0 ? <Container/> : <CardsTable cards={cards} typeNamesMap={typeNamesMap} />;
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)}></Col>
      </Row>
      <Row>
        <Col xs={6} md={2}>
          <Form.Select value={languageId}  onChange={(event) => setLanguageId(event.target.value)} >
            {languageIds.map(
              id => <option key={id} value={id}>{languageNamesMap[id]}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={familiarity} onChange={(event) => setFamiliarity(event.target.value)} >
            {Object.keys(FAMILIARITY_MAP).map(
              s => <option key={FAMILIARITY_MAP[s]} value={s}>{FAMILIARITY_MAP[s]}</option>
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
          <Button variant="primary" onClick={startReviewing} >
             Review
          </Button>
        </Col>
      </Row>
      {cardsTable}
    </Container>
  );
}
