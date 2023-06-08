import * as React from 'react';
import { CartModel } from '../../../types/interfaces';
import { useAppDispatch } from '../../../redux/hooks';
import { useFetchProductsQuery } from '../../../redux/productsRedux';
import { addComment, changeQuantity, removeFromCart } from '../../../redux/cartRedux';
import { Row, Col, Button, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL } from '../../../config';
import styles from './CartItem.module.scss';

interface CartItemProps {
  cart: CartModel[],
  showCheckout: boolean
}

const Component: React.FC<CartItemProps> = ({ cart, showCheckout }) => {
  const dispatch = useAppDispatch();
  const { data: products = [] } = useFetchProductsQuery();
  
  const handleQuantity = (quantity: number, item: CartModel) => {
    let result = 0;
    result = item.quantity + quantity;
    const inStock = handleMaxQuantity(item);
  
    if (result > 0 && result <= inStock) dispatch(changeQuantity({quantity, id: item._id}));
    else if (result > inStock) alert(`Only ${inStock} products in stock`);
    else if (isNaN(quantity)) alert('Quantity must me a number');
    else alert('To remove item click trash icon');
  };
  
  const handleMaxQuantity = (item: CartModel) => {
    let inStock = 0;
    products.some(product => product._id === item._id ? inStock = product.inStock : inStock);
    return inStock;
  };
  
  return (
    <>
      <Row>
        <Col xs lg="5">
          <p>Product</p>
        </Col>
        <Col xs lg="1">
          <p>Price</p>
        </Col>
        <Col xs lg="1">
          <p>Subtotal</p>
        </Col>
        <Col xs lg="2">
          <p>Comments</p>
        </Col>
        <Col xs lg="3">
          <p>Quantity</p>
        </Col>
      </Row>
      {
        cart.map(item => {
          return (
            <Row className={styles.cartItem} key={item._id}>
              <Col className={styles.imageWrapper} xs lg='2'>
                <img className={styles.image} src={`${IMAGES_URL}/${item.src}`} alt={item.name} />
              </Col>
              <Col xs lg='3' className={styles.itemDetails}>
                <NavLink className={styles.bold} href={`/product/${item._id}`}>{item.name}</NavLink>
                <p>{item.description}</p>
              </Col>
              <Col xs lg='1'>
                <p>${item.price}</p>
              </Col>
              <Col xs lg='1'>
                <p>${item.price * item.quantity}</p>
              </Col>
              <Col xs lg='2'>
                {
                  showCheckout ?
                    <p>{item.comment}</p>
                    :
                    <textarea id={item._id} placeholder='Additional comments' value={item.comment} onChange={event => dispatch(addComment({comment: event.target.value, id: item._id}))} />
                }
              </Col>
              <Col xs lg='3' className={styles.quantity}>
                {
                  showCheckout ?
                    <p>{item.quantity}</p>
                    :
                    <>
                      <Button className={styles.quantityBtn} onClick={() => handleQuantity(1, item)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                      <input
                        type='text'
                        id='quantity'
                        name='quantity'
                        className={styles.quantityInput}
                        value={item.quantity}
                        min='0'
                        max={handleMaxQuantity(item)}
                        onChange={(event) => handleQuantity((parseInt(event.target.value) - item.quantity), item)}
                      />
                      <Button className={styles.quantityBtn} variant='secondary' onClick={() => handleQuantity(-1, item)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <Button className={styles.quantityBtn} variant='secondary' onClick={() => dispatch(removeFromCart({id: item._id}))}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </>
                }
              </Col>
            </Row>
          );
        })
      }
    </>
  );
};

export {
  Component as CartItem,
  Component as CartItemComponent,
};