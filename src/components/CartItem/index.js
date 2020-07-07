import React from "react";
import styled from "styled-components";
import * as action from "../../actions/saleCart";
import { useStore } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 280px;
  border-bottom: 1px solid #d0d0d0;
  padding: 10px;
`;

const ItemImage = styled.figure`
  width: 39%;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-right: 10px;
  text-align: center;

  img {
    height: 85%;
    @media (min-width: 780px) {
      width: 200px;
    }
  }
  @media (min-width: 780px) {
    align-items: center;
  }
`;

const RemoveItemBtn = styled.a`
  background: transparent;
  color: #fc2821;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  font-weight: bold;
`;

const ItemInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const ItemInfoText = styled.span`
  width: 50%;
  margin-bottom: 5px;
  text-align: ${(props) => props.textAlign ?? "left"};
  font-weight: ${(props) => props.fontWeight ?? "normal"};
  font-size: ${(props) =>
    props.fontSize === "big"
      ? "1.5rem"
      : props.fontSize === "medium"
      ? "1.2rem"
      : props.fontSize === "small"
      ? "1rem"
      : "1rem"};
  color: ${(props) => (props.disabled ? "#a7a7a7" : "#000")};
`;

const ItemInfoGroup = styled.div`
  width: 100%;
  height: 2em;

  span {
    padding: 5px 10px;
  }
`;

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
`;

const CartItem = ({ code_color, size }) => {
  //com redux
  // const cartItems = useSelector( state => {
  //     return state.saleCart.cartItems
  // })
  // const dispatch = useDispatch();
  const [{ cartItems }, dispatch] = useStore(false);
  const data =
    cartItems &&
    cartItems.filter(
      (item) => item.code_color === code_color && item.size === size
    )[0];

  const incrementQty = () => {
    dispatch("INCREMENT_QUANTITY", { code_color, size });
    //com redux
    // dispatch(action.incrementProductQuantity(style));
  };

  const decrementQty = () => {
    if (data.quantity <= 1) {
      //com redux
      // return dispatch(action.removeProduct(style))
      return dispatch("REMOVE_ITEM", { code_color, size });
    }
    //com redux
    // dispatch(action.decrementProductQuantity(style));
    dispatch("DECREMENT_QUANTITY", { code_color, size });
  };

  const removeItem = () => {
    //com redux
    // return dispatch(action.removeProduct(style))
    dispatch("REMOVE_ITEM", { code_color, size });
  };

  return (
    <Content>
      <ItemImage>
        <img src={data.image} alt="Produto"></img>
        <RemoveItemBtn onClick={removeItem}>Remover Item</RemoveItemBtn>
      </ItemImage>
      <ItemInfo>
        <ItemInfoText fontWeight="bold" fontSize="big">
          {data.name}
        </ItemInfoText>
        <ItemInfoText textAlign="right" fontWeight="bold" fontSize="big">
          {data.actual_price}
        </ItemInfoText>
        <ItemInfoText disabled={true}>Tam.: {data.size}</ItemInfoText>
        <ItemInfoText textAlign="right" disabled={true} fontSize="medium">
          {data.installments}
        </ItemInfoText>
        <ItemInfoGroup>
          <CartButton onClick={decrementQty}>-</CartButton>
          <ItemInfoText textAlign="center" fontSize="big">
            {data.quantity}
          </ItemInfoText>
          <CartButton onClick={incrementQty}>+</CartButton>
        </ItemInfoGroup>
      </ItemInfo>
    </Content>
  );
};

export default CartItem;
