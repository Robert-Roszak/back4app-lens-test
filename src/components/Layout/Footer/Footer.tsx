import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Component: React.FC = () => {

  return (
    <footer className={styles.root}>
      <Container className={styles.alignCenter}>
        <Row>
          <p className={styles.footerText}>by Robert Roszak - All Rights Reserved 2022</p>
        </Row>
      </Container>
    </footer>
  );
};

export {
  Component as Footer,
};