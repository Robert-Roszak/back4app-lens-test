import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import styles from './NewOrderConfirmation.module.scss';

interface NewOrderConfirmationProps {
  orderId: string,
}

const Component: React.FC<NewOrderConfirmationProps> = ({orderId}) => {
  return (
    <Container className={styles.root} fluid={'md'}>
      <section>
        <Row className='justify-content-center'>
          <Col xs lg='5' className={styles.confirmation}>
            <p>Thank you for trusting us with your order.</p>
            <p>We have given it number {orderId}</p>
            <p>Create account here to view its status</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export {
  Component as NewOrderConfirmation,
  Component as NewOrderConfirmationComponent,
};
