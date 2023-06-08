import React from 'react';
import { CartModel, OrderModel } from '../../../types/interfaces';
import { useSendOrderMutation } from '../../../redux/orderRedux';
import { Button, Form } from 'react-bootstrap';

import styles from './Checkout.module.scss';

interface CheckoutProps {
  cart: CartModel[],
  totalPrice: number,
  callback: (id: string) => void,
}

const Component: React.FC<CheckoutProps> = ({cart, totalPrice, callback}) => {
  const [addNewOrder ] = useSendOrderMutation();

  const validateEmail = (email: string) => {
    const validRegex = /\S+@\S+\.\S+/;
    if (email.match(validRegex)) return true;
    else return false;
  };

  const createOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderDetails = {} as OrderModel;
    const email = (document.getElementById('formEmail') as HTMLInputElement).value;
    const contact = (document.getElementById('formContact') as HTMLInputElement).value;
    const address = (document.getElementById('formAddress') as HTMLInputElement).value;
    const payment = (document.getElementById('formPayment') as HTMLInputElement).value;
    const shipping = (document.getElementById('formShipping') as HTMLInputElement).value;
    const message = (document.getElementById('formMessage') as HTMLInputElement).value;

    if (contact && address && payment && shipping && validateEmail(email)) {
      orderDetails.contact = contact;
      orderDetails.address = address;
      orderDetails.payment = payment;
      orderDetails.shipping = shipping;
      orderDetails.message = message;
      orderDetails.email = email;
      orderDetails.items = cart;
      orderDetails.toPay = totalPrice;
      const createdOrder = await addNewOrder(orderDetails).unwrap();

      callback(createdOrder.orderId);
    }
    else alert('Please provided all details');
  };

  return (
    <>
      <Form className={styles.form} onSubmit={event => createOrder(event)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label>First and last name</Form.Label>
          <Form.Control type="text" required placeholder="First and last name"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" required placeholder="Address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPayment">
          <Form.Label>Payment method</Form.Label>
          <Form.Select required>
            <option value="credit">Credit card</option>
            <option value='cash'>Cash</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formShipping">
          <Form.Label>Pickup method</Form.Label>
          <Form.Select required>
            <option value="shipping">Shipping</option>
            <option value="inPerson">In person</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Optional message to the seller</Form.Label>
          <Form.Control type="text" placeholder="Optional message to the seller" />
        </Form.Group>

        <Button type="submit" className={styles.submit} variant="primary">Pay ${totalPrice} and order!</Button>
      </Form>
    </>
  );
};

export {
  Component as Checkout,
  Component as CheckoutComponent,
};
