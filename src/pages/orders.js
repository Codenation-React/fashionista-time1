import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../store/store";
import styled from "styled-components";
import Loading from "../components/UI/Loading";
import useInitProducts from '../hooks/useInitProducts';

const OrdersContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;
const OrdersItem = styled.div`
  background-color: white;
  margin-top: 15px;
  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  box-shadow: 4px 2px 8px -2px rgba(0, 0, 0, 0.6);
`;
const OrdersDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OrderList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
`;

const OrdersTitle = styled.h3`
  white-space: nowrap;
  font-size: 1.8rem;
`;
const OrdersListItem = styled.li`
  list-style: none;
  font-size: 1.4rem;
  strong {
    font-size: 1.3rem;
  }
`;

const OrdersProductsListItem = styled.li`
  width: 100%;
  margin-bottom: 12px;
  list-style: none;
  div {
    font-size: 1.2rem;
    strong {
      font-size: 1.3rem;
    }
    &::after {
      border-bottom: 1px solid #ccc;
    }
  }
`;
const OrdersIndice = styled.h4`
  font-size: 1.5rem;
`;

const Orders = () => {
  const [state, dispatch] = useStore(false);
  const [orders, setOrders] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const products = useInitProducts();

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `https://fashionista-time1.firebaseio.com/orders.json?orderBy="userID"&equalTo="${state.userID}"`
      )
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, []);

  let MyOrders =
    orders && !IsLoading ?
    Object.values(orders).map((each, index) => {
      const TotalValue = each.cartItems.reduce((accumulator, cartItem) => {
        return (
          accumulator +
          cartItem.quantity *
            parseFloat(
              cartItem.actual_price.replace(/[^0-9,]/g, "").replace(",", ".")
            )
        );
      }, 0);
      return (
        <OrdersItem key={index}>
          <OrdersIndice>#{index + 1}</OrdersIndice>
          <OrdersDiv>
            <OrdersTitle>
              Produtos comprados({each.cartItems.length})
            </OrdersTitle>
            <OrderList>
              {each.cartItems.map((each) => {
                return (
                  <OrdersProductsListItem key={each.code_color + each.size}>
                    <div>
                      <strong>Nome:</strong> {each.name}
                    </div>
                    <div>
                      <strong>Tamanho:</strong> {each.size}
                    </div>
                    <div>
                      <strong>Preço:</strong> {each.actual_price}
                    </div>
                    <div>
                      <strong>Quantidade:</strong> {each.quantity}
                    </div>
                  </OrdersProductsListItem>
                );
              })}
            </OrderList>
          </OrdersDiv>
          <OrdersDiv>
            <OrdersTitle>Endereço de entrega</OrdersTitle>
            <OrderList>
              <OrdersListItem>
                <strong>Rua/Av.:</strong> {each.addressData.street}
              </OrdersListItem>
              <OrdersListItem>
                <strong>Número: </strong>
                {each.addressData.number}
              </OrdersListItem>
              <OrdersListItem>
                <strong>Zip Code: </strong>
                {each.addressData.zipCode}
              </OrdersListItem>
            </OrderList>
          </OrdersDiv>
          <OrdersDiv>
            <OrdersTitle>Informações de Pagamento</OrdersTitle>
            <OrderList>
              <OrdersListItem>
                <strong>Cartão com final: </strong>
                {
                  each.cardData.number.split(" ")[
                    each.cardData.number.split(" ").length - 1
                  ]
                }
              </OrdersListItem>
              <OrdersListItem>
                <strong>Titular do Cartão:</strong> {each.cardData.name}
              </OrdersListItem>
              <OrdersListItem>
                <strong>Total Pago:</strong> ${" "}
                {TotalValue.toFixed(2).replace(".", ",")}
              </OrdersListItem>
            </OrderList>
          </OrdersDiv>
        </OrdersItem>
      );
    }) : <Loading/>;

  return <OrdersContent>{MyOrders}</OrdersContent>;
};

export default Orders;
