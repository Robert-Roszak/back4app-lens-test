import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOrderQuery } from '../../../redux/orderRedux';
import { Container, Spinner } from 'react-bootstrap';
import styles from './Order.module.scss';

const Component: React.FC = () => {
  const {id} = useParams();
  const { data: order, isSuccess } = useFetchOrderQuery(id);

  if (isSuccess) {
    console.log(order);
    return (
      <Container className={styles.root} fluid={'md'}>

      </Container>
    );
  }
  else {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }
};

export {
  Component as Order,
  Component as OrderComponent,
};
