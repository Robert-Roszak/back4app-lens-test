import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { NavLink } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket, faCamera } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

const Component: React.FC = () => {
  const cart = useAppSelector(state => state.cart.items);
  return (
    <header className={styles.root}>
      <Container>
        <Row className={styles.alignCenter}>
          <Col className={styles.phoneNumber}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> 2300 - 3560 - 222
            </p>
          </Col>
          <Col className={styles.logo}>
            <NavLink to='/' className={styles.link}>
              <FontAwesomeIcon className={styles.icon} icon={faCamera} />
              <p>Lens shop</p>
            </NavLink>
          </Col>
          <Col className={styles.cart}>
            <NavLink to={'/cart'} className='active'>
              <button className={styles.cartBox}>
                <div className={styles.cartIcon}>
                  <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
                </div>
                <div className={styles.cartCounter}>{cart.length}</div>
              </button>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export {
  Component as Header,
  Component as HeaderComponent,
};


