import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import InputMask from "react-input-mask";
import axios from 'axios';

const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

const CheckoutForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0px;
  input {
    border: 1px solid #ccca;
    border-radius: 10px;
    font-size: 23px;
    font-weight: bold;
    height: 70%;
    padding: 15px;
    width: 90%;
    &:focus {
      border: 2px solid #ccca;
      outline: none;
    }
    margin: 10px 0px;
  }
`;
const CheckoutBtn = styled.button`
  cursor: pointer;
  background-color: white;
  border: 1px solid #16161d;
  border-radius: 4px;
  width: 180px;
  height: 50px;
  font-size: 20px;
  margin: 20px auto;
  &:hover {
    height: 51px;
    width: 181px;
    font-size: 22px;
  }
`;

const CheckoutLabel = styled.label`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
`

const Checkout = () => {
  const [state, dispatch] = useStore(false);
  const [cardData, setCardData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const [addressData, setAddressData] = useState({
    street: "",
    number: "",
    zipCode: "",
  });

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const checkoutHandler = () => {

    const orderData = {
        cartItems: state.cartItems,
        cardData: cardData,
        addressData: addressData,
        userID: state.userID,
    }

    axios.post('https://fashionista-time1.firebaseio.com/orders.json', orderData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })

  }

  return (
    <CheckoutContent>
      <div id="PaymentForm">
        <Cards
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          focused={cardData.focus}
          name={cardData.name}
          number={cardData.number}
        />
        <CheckoutForm>
          <InputMask
            mask="9999 9999 9999 9999"
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="text"
            name="name"
            placeholder="Card name"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            mask="99/9999"
            maskPlaceholder="mm/yyyy"
            type="text"
            name="expiry"
            placeholder="Validade"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            mask="999"
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <CheckoutLabel>Endereço de Envio</CheckoutLabel>
          <InputMask
            type="tel"
            name="street"
            placeholder="Street"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="tel"
            name="number"
            placeholder="Number"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="tel"
            name="zipCode"
            placeholder="Zip Code"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <CheckoutBtn onClick={() => checkoutHandler()}>CHECKOUT</CheckoutBtn>
        </CheckoutForm>
      </div>
    </CheckoutContent>
  );
};

export default Checkout;
