import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useStore } from '../../store/store';
import { INCREMENT_QUANTITY, DECREMENT_QUANTITY, REMOVE_ITEM } from '../../store/products-store';

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 280px;
    border-bottom: 1px solid #d0d0d0;
    padding: 15px;
`

const ItemImage = styled.figure`
    width: 39%;
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-right: 10px;
    text-align: center;

    img {
        height: 85%;
        @media(min-width: 780px){
            width: 200px;
        }
    }
    @media(min-width: 780px){
        align-items: center;
    }

`

const RemoveItemBtn = styled.a`
    background: transparent;
    color: #fc2821;
    border: none;
    cursor: pointer;
    margin-top: 5px;
    font-weight: bold;
`

const ItemInfo = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
`

const ItemInfoText = styled.span`
    width: 50%;
    margin-bottom: 5px;
    text-align: ${(props) => (props.textAlign ?? 'left')};
    font-weight: ${(props) => (props.fontWeight ?? 'normal')};
    font-size: ${(props) => ( props.fontSize === "big" ? "1.5rem" : 
                              props.fontSize === "medium" ? "1.2rem" :
                              props.fontSize === "small" ? "1rem" : '1rem')};
    color: ${(props) => (props.disabled ? '#a7a7a7' : '#000')};
`

const ItemInfoGroup = styled.div`
    width: 50%;
    height: 2em;

    span {
        padding: 5px 10px;
    }
`

const CartButton = styled.button`
    background-color: #f9f9f9;
    color: #212529;
    font-size: 1.5rem;
    border: 1px solid #000;
    padding: 4px 9px;
    cursor: pointer;

    :hover {
        background-color: #000;
    }

    :focus {
        outline: none;
    }
`

const CartItem = ({ style }) => {
    const [{cartItems}, dispatch] = useStore(false);
    
    const data = cartItems.filter(item => item.style === style)[0];

    const incrementQty = () => {
        dispatch(INCREMENT_QUANTITY, style);
    }

    const decrementQty = () => {
        dispatch(DECREMENT_QUANTITY, style);
    }

    const removeItem = () => {
        dispatch(REMOVE_ITEM, style);
    }
    return (
        <Content>
            <ItemImage>
                <img  src={data.image} alt="Produto"></img>
                <RemoveItemBtn onClick={removeItem}>Remover Item</RemoveItemBtn>
            </ItemImage>
            <ItemInfo>
                <ItemInfoText fontWeight="bold" fontSize="big">{data.name}</ItemInfoText>
                <ItemInfoText textAlign="right" fontWeight="bold" fontSize="big">{data.actual_price}</ItemInfoText>
                <ItemInfoText disabled="true">Tam.: P</ItemInfoText> 
                <ItemInfoText textAlign="right" disabled="true" fontSize="medium">{data.installments}</ItemInfoText>
                <ItemInfoGroup>
                    <CartButton onClick={decrementQty}>-</CartButton>
                    <ItemInfoText textAlign="center" fontSize="big">{data.quantity}</ItemInfoText>
                    <CartButton onClick={incrementQty}>+</CartButton>
                </ItemInfoGroup>
            </ItemInfo>
        </Content>
    )
}


export default CartItem;