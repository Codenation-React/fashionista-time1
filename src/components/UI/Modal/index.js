import React, { useState, useEffect } from "react";
import Backdrop from "../Backdrop";
import classes from "./Modal.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import styled from "styled-components";
import { useStore } from "../../../store/store";
import Search from "../../../containers/Search/";
import Cart from "../../../containers/Cart";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as action from "../../../actions/modalHandler";
import Login from "../../../containers/Login";
import Register from "../../../containers/register";
import MyAccount from "../../myAccount";
import { Link } from "react-router-dom";

const ModalContainer = styled.div`
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ModalTopBar = styled.div`
  height: 7rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  justify-content: flex-start;
`;
const Content = styled.div`
  width: 80%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
`;

const ModalBottomBar = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  height: 50px;
  background: #212529;
  div {
    font-size: 1.5rem;
    color: white;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
  }
  a{
    font-size: 1.5rem;
    color: white; 
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
  }
  a:hover{
      font-weight: 700;
  }
`;

const Modal = (props) => {
  const [{ show, Navtype, cartItems, isAuth }, dispatch] = useStore(false);
  // const state = useSelector(state => state.modalHandler);
  // const dispatch = useDispatch();
  const [shouldShow, setShouldShow] = useState(false);
  const [totalValue = 0, setTotalValue] = useState();

  useEffect(() => {
    setShouldShow(show);
  }, [show]);

  useEffect(() => {
    setTotalValue(
      cartItems.reduce((accumulator, cartItem) => {
        return (
          accumulator +
          cartItem.quantity *
            parseFloat(
              cartItem.actual_price.replace(/[^0-9,]/g, "").replace(",", ".")
            )
        );
      }, 0)
    );
  }, [cartItems]);

  const ModalClasses = [classes.Modal];

  shouldShow
    ? ModalClasses.push(classes.Open)
    : ModalClasses.push(classes.Close);

  const closeModal = () => {
    dispatch("TOGGLE_SHOW", Navtype);
    // dispatch(action.toggleModal(state.Navtype))
  };
  const totalCart = cartItems.length;

  let content;
  let title;
  switch (Navtype) {
    case "search":
      title = "Buscando Produtos";
      content = <Search />;
      break;
    case "cart":
      title = `Sacola (${totalCart})`;
      content = <Cart />;
      break;
    case "register":
      title = "Registre-se";
      content = <Register />;
      break;
    case "user":
      title = "Minha Conta";
      content = <MyAccount />;
      break;
    case "Login":
      title = "Faça Login";
      content = <Login />;
      break;
    default:
      break;
  }

  const checkoutWithAuth = () => {
      if(isAuth){
        dispatch("TOGGLE_SHOW");
      }else{
          dispatch("TOGGLE_SHOW");
          dispatch("TOGGLE_SHOW", 'Login');
          dispatch("FROM_CHECKOUT");
      }
  }

  return (
    <>
      <Backdrop show={shouldShow} />
      <ModalContainer className={ModalClasses.join(" ")}>
        <ModalTopBar>
          <ArrowBackIcon
            style={{ fontSize: 30, cursor: "pointer" }}
            onClick={() => closeModal()}
          />
          <Content>{title}</Content>
        </ModalTopBar>
        {content}
        <ModalBottomBar show={Navtype === "cart"}>
          <div>
            Subtotal - R$ {totalValue.toFixed(2).replace(".", ",")}{" "}
            <Link to="/checkout" onClick={() => checkoutWithAuth()}>
              CHECKOUT 
              <ArrowForwardIcon style={{fontSize: 30}}/>
            </Link>
          </div>
        </ModalBottomBar>
      </ModalContainer>
    </>
  );
};

export default Modal;
