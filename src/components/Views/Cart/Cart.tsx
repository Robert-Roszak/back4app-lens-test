import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { clearCart } from '../../../redux/cartRedux';
import { CartItem } from '../../Features/CartItem/CartItem';
import { Checkout } from '../../Features/Checkout/Checkout';
import { NewOrderConfirmation } from '../NewOrderConfirmation/NewOrderConfirmation';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Cart.module.scss';

const Component: React.FC = () => {
  const [showCheckout, setCheckout] = useState(false);
  const [showConfirmation, setConfirmation] = useState(false);
  const [barState, setBarState] = useState(33);
  const [barLabel, setLabel] = useState('Your cart');
  const [orderId, setOrderId] = useState('');
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  let totalPrice = 0;
  let deliveryFee = 100;
  const freeDeliveryFrom = 1500;

  const handlePrice = () => {
    if (cart) {
      cart.forEach(item => totalPrice += item.price * item.quantity);
      if (totalPrice > freeDeliveryFrom) deliveryFee = 0;
      else totalPrice += deliveryFee;
    }
  };

  const handleClickCheckout = () => {
    setCheckout(true);
    setBarState(66);
    setLabel('Delivery and payment');
  };

  const handleCallback = (orderId: string) => {
    console.log('calledback');
    console.log(orderId);
    setOrderId(orderId);
    setCheckout(false);
    setConfirmation(true);
    setLabel('Order complete!');
    setBarState(100);
    dispatch(clearCart());
  };

  if (!cart || cart.length === 0 && !showConfirmation) {
    return (
      <Container className={styles.root}>
        <Row className={styles.emptyCart}>
          <Col xs lg="2">
            <p>Your cart is empty :(</p>
            <Button href="/" variant="primary">Go shopping!</Button>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    handlePrice();
    return (
      <Container className={styles.root}>
        <ProgressBar now={barState} label={`${barLabel}`} />
        { !showConfirmation ?
          <>
            <section>
              <Row className="justify-content-md-center">
                <Col xs lg="3">
                  {
                    showCheckout ?
                      <h2 className={styles.center}>Checkout</h2>
                      :
                      <h2 className={styles.center}>Cart</h2>
                  }
                  {
                    cart.length === 1 ?
                      <p className={styles.center}>You have {cart.length} item in your cart</p>
                      :
                      <p className={styles.center}>You have {cart.length} items in your cart</p>
                  }
                </Col>
              </Row>
            </section>

            <section>
              <CartItem cart={cart} showCheckout={showCheckout} />
            </section>
          </>
          : 
          <NewOrderConfirmation orderId={orderId} />
        }
        
        {
          !showCheckout && !showConfirmation ?
            <>
              <section>
                <Row className={clsx('justify-content-center', styles.checkout)}>
                  <Col xs lg="5">
                    {
                      deliveryFee === 0 ?
                        <p className={styles.txtAlignEnd}>Free delivery!</p>
                        :
                        <p className={styles.txtAlignEnd}>Get items for <i>${(freeDeliveryFrom - totalPrice + deliveryFee)}</i> more to save <i>${deliveryFee}</i> delivery fee</p>
                    }
                    <p className={styles.txtAlignEnd}><strong>Total:</strong> ${totalPrice}</p>
                    <Button className={styles.fullWidth} variant="primary" onClick={() => handleClickCheckout()}>Checkout</Button>
                  </Col>
                </Row>
              </section>
            </>
            : 
            ''
        }
        { showCheckout ? <Checkout cart={cart} totalPrice={totalPrice} callback={handleCallback}/> : '' }
      </Container>
    );
  }
};

export {
  Component as Cart,
  Component as CartComponent,
};