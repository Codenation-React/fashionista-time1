import React from "react";
import styled from "styled-components";
import CartItem from "../../components/CartItem";
import { useStore } from "../../store/store";
// import {  useSelector } from 'react-redux';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

const Cart = () => {
  const [{ cartItems }, dispatch] = useStore(false);
  //com redux
  // const cartItems = useSelector(state => state.saleCart.cartItems)
  return (
    <Content>
      {cartItems
        ? cartItems.map(({ code_color, size }) => {
            return (
              <CartItem
                key={code_color + size}
                code_color={code_color}
                size={size}
              ></CartItem>
            );
          })
        : null}
    </Content>
  );
};

export default Cart;
