import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import InputMask from "react-input-mask";
import axios from 'axios';
import Loading from "../components/UI/Loading";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Redirect } from 'react-router-dom';
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import useInitProducts from '../hooks/useInitProducts';

const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

const NoResultFound = styled.span`
  margin: auto 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
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

const CheckoutSuccess = styled.div`
  height: 100vh;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SuccessParagraph = styled.p`
  font-size: 30px;
`;

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

  const [IsLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [shouldRedirect, setshouldRedirect] = useState(false);
  const products = useInitProducts();

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
    setIsLoading(true);
    axios.post('https://fashionista-time1.firebaseio.com/orders.json', orderData)
        .then(response => {
            setSuccess(true);
            setIsLoading(false);
            dispatch("RESET_CART");
        })
        .catch(error => {
            setError(true);
            setIsLoading(false);
        })

  }

  let content = (
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
          <CheckoutLabel>Informações de Pagamento</CheckoutLabel>
          <InputMask
            mask="9999 9999 9999 9999"
            type="tel"
            name="number"
            placeholder="Numero do Cartão"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="text"
            name="name"
            placeholder="Nome do Titular"
            onChange={handleCardInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            mask="99/9999"
            maskPlaceholder="mm/yyyy"
            type="text"
            name="expiry"
            placeholder="Data de Validade"
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
            placeholder="Rua/Av"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="tel"
            name="number"
            placeholder="Número"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="tel"
            name="zipCode"
            placeholder="CEP"
            onChange={handleAddressInputChange}
            onFocus={handleInputFocus}
          />
          <CheckoutBtn onClick={() => checkoutHandler()}>COMPRAR</CheckoutBtn>
        </CheckoutForm>
      </div>
    </CheckoutContent>
  )

  if(IsLoading){
    content = <Loading/>
  }

  if(error){
    content = (
      <NoResultFound>
        <SentimentDissatisfiedOutlinedIcon
          style={{ fontSize: 100 }}
        />
        Não foi possivel realizar a compra! Tente novamente em instantes
    </NoResultFound>
    )
    setTimeout(()=>{
      setError(false);
    }, 1200)
  }
  
  if(success){
    content = (
    <CheckoutSuccess>
      <CheckCircleOutlineIcon style={{ fontSize: 100 }} />
      <SuccessParagraph>Compra Realizada com Sucesso</SuccessParagraph>
    </CheckoutSuccess>  
    )
    setTimeout(()=>{
      setshouldRedirect(true);
      
    }, 1200)
  }
  return (
    <>
    {content}
    {shouldRedirect && <Redirect to="/orders"/>}
    </>
    );
};

export default Checkout;
