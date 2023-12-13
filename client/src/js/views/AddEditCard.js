import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import { FAMILIARITY_MAP, getCard, removeCard, updateCard } from '../utils/cards';
import { getLanguageNames, getWordTypeNames } from '../utils/language';
import { getPaddingStyle } from '../utils/style';
import { getUserProfile } from '../utils/user';

const ALERT_TIMEOUT_MS = 2000;
const DEFAULT_TYPE_ID = 1;
const DEFAULT_FAMILIARITY = 0;

export default function AddEditCard(props) {
  const [loadedUserprofile, setLoadedUserprofile] = useState(false);
  const [languageId, setLanguageId] = useState(0);
  const [languageIds, setLanguageIds] = useState([]);
  const [languageNamesMap, setLanguageNamesMap] = useState({});
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [typeId, setTypeId] = useState(DEFAULT_TYPE_ID);
  const [typeNamesMap, setTypeNamesMap] = useState({});
  const [details, setDetails] = useState("");
  const [familiarity, setFamiliarity] = useState(DEFAULT_FAMILIARITY);
  const [existsMessage, setExistsMessage] = useState("");
  const [existsMessageVariant, setExistsMessageVariant] = useState("warning");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationMessageVariant, setValidationMessageVariant] = useState("danger");
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
  const checkIfCardExists = () => {
    if (word === "") {
      setExistsMessage("Word can not be empty...")
      setExistsMessageVariant("warning")
      setTranslation("");
      setTypeId(DEFAULT_TYPE_ID);
      setDetails("");
      setFamiliarity(DEFAULT_FAMILIARITY);
    } else {
      getCard(props.userSecret, languageId, word).then(data => {
        if (data.exists) {
          const card = data.card;
          setExistsMessage("Found existing word")
          setExistsMessageVariant("success")
          setWord(card.word);
          setTranslation(card.translation);
          setTypeId(card.typeId);
          setDetails(card.details);
          setFamiliarity(card.familiarity);
        } else {
          setExistsMessage("Word does not exist...")
          setExistsMessageVariant("warning")
          setTranslation("");
          setTypeId(DEFAULT_TYPE_ID);
          setDetails("");
          setFamiliarity(DEFAULT_FAMILIARITY);
        }
      });
    }
    setTimeout(() => setExistsMessage(""), ALERT_TIMEOUT_MS);
  };
  const tryAddCard = () => {
    if (word === "") {
      setValidationMessage("Word can not be empty!");
      setValidationMessageVariant("danger");
    } else if (translation === "") {
      setValidationMessage("Translation can not be empty!");
      setValidationMessageVariant("danger");
    } else {
      const card = {word: word.trim(), translation: translation.trim(), typeId: typeId, details: details.trim(), familiarity: familiarity}
      updateCard(props.userSecret, languageId, card).then(response => {
        if (response.success) {
          setValidationMessage("Successfully added card");
          setValidationMessageVariant("success");
        } else {
          setValidationMessage("Failed to add card!");
          setValidationMessageVariant("danger");
        }
      });
    }
    setTimeout(() => setValidationMessage(""), ALERT_TIMEOUT_MS);
  };
  const tryRemoveCard = () => {
    if (word === "") {
      setValidationMessage("Word can not be empty!");
      setValidationMessageVariant("danger");
    } else {
      removeCard(props.userSecret, languageId, word).then(response => {
        if (response.success) {
          setValidationMessage("Successfully removed card");
          setValidationMessageVariant("success");
        } else {
          setValidationMessage("Failed to remove card!");
          setValidationMessageVariant("danger");
        }
      });
    }
    setTimeout(() => setValidationMessage(""), ALERT_TIMEOUT_MS);
  };
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Col xs={6} md={2}>
          <Form.Select value={languageId} onChange={(event) => setLanguageId(event.target.value) } >
            {languageIds.map(
              id => <option key={id} value={id}>{languageNamesMap[id]}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control placeholder="Word" value={word} onChange={(event) => setWord(event.target.value)} onKeyDown={(e) => {if (e.key === "Enter") checkIfCardExists()}} />
        </Col>
        <Col xs={12} className="d-block d-sm-none" style={getPaddingStyle(10)} />
        <Col xs={6} md={3}>
          <Button variant="secondary" onClick={() => checkIfCardExists()}>
             Search
          </Button>
        </Col>
        <Col xs={6} md={3}>
          <Alert variant={existsMessageVariant} show={existsMessage !== ""} dismissible={true} onClose={() => setExistsMessage("")} >
             {existsMessage}
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control placeholder="Translation" value={translation} onChange={(event) => setTranslation(event.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={6} md={2}>
          <Form.Select value={typeId} onChange={(event) => setTypeId(event.target.value) } >
            {Object.keys(typeNamesMap).map(
              t => <option key={t} value={t}>{typeNamesMap[t]}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Control placeholder="Details" value={details} onChange={(event) => setDetails(event.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Select value={familiarity} onChange={(event) => setFamiliarity(event.target.value)} >
            {Object.keys(FAMILIARITY_MAP).map(
              s => <option key={FAMILIARITY_MAP[s]} value={s}>{FAMILIARITY_MAP[s]}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={6} md={3}>
          <Button variant="primary" onClick={() => tryAddCard()}>
             Add / Edit
          </Button>
        </Col>
        <Col xs={6} md={3}>
          <Button variant="danger" onClick={() => tryRemoveCard()}>
             Remove
          </Button>
        </Col>
        <Col xs={12} className="d-block d-sm-none" style={getPaddingStyle(10)} />
        <Col xs={12} md={3}>
          <Alert variant={validationMessageVariant} show={validationMessage !== ""} dismissible={true} onClose={() => setValidationMessage("")} >
             {validationMessage}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
