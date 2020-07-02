import React from 'react';
import styled from 'styled-components'
import CartItem from '../../components/CartItem'
import { useStore } from '../../store/store';
import {  useSelector } from 'react-redux';

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: #f9f9f9;
`
const Cart = () => {
    const [{cartItems}, dispatch] = useStore(true);
    //com redux
    // const cartItems = useSelector(state => state.saleCart.cartItems)
    return (
        <Content>
            {
                cartItems.map((product) => {
                    return <CartItem key={product.code_color} code_color={product.code_color}></CartItem>
                })
            }
        </Content>
    )
}

export default Cart;