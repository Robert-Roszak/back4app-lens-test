import React from 'react';
import { useFetchProductsQuery } from '../../../redux/productsRedux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { Products } from '../Products/Products';
import styles from './Homepage.module.scss';

const Component: React.FC = () => {
  const { data: products = [], isSuccess } = useFetchProductsQuery();

  if (isSuccess) {
    return (
      <div className={styles.root}>
        <Container>
          <Row className="g-4">
            <h2>Our products</h2>
            {
              products.map(product => (<Products product={product} key={product._id}/>))
            }
          </Row>
        </Container>
      </div>
    );
  }
  else {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
};

export {
  Component as Homepage,
};