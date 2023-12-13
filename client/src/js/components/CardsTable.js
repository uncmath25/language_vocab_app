import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

import { FAMILIARITY_MAP } from '../utils/cards';
import { getPaddingStyle } from '../utils/style';

export default function CardsTable(props) {
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Word</th>
              <th>Translation</th>
              <th>Type</th>
              <th>Details</th>
              <th>Familiarity</th>
            </tr>
          </thead>
          <tbody>
            {props.cards.map(card =>
              <tr key={card.word}>
                <td>{card.word}</td>
                <td>{card.translation}</td>
                <td>{props.typeNamesMap[card.typeId]}</td>
                <td>{card.details}</td>
                <td>{FAMILIARITY_MAP[card.familiarity]}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
