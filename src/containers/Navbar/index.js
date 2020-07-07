import React from "react";
import Logo from "../../assets/clothes.svg";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Modal from "../../components/UI/Modal";
import { useStore } from "../../store/store";
// import { useDispatch } from 'react-redux';
// import * as action from '../../actions/modalHandler';

const Header = styled.header`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Navlista = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const Nav = styled.nav`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListItem = styled.li`
  list-style: none;
  margin: 10px 5px;
`;
const ImgLink = styled.a`
  display: flex;
  height: 45px;
  align-items: center;
  justify-content: flex-start;
  & > img {
    @media (min-width: 480px) {
      width: 100px;
    }
    height: 50px;
  }
`;

const LinkModal = styled.a`
  text-decoration: none;
  color: #000;
  display: flex;
  cursor: pointer;
`;
const TotalItems = styled.div`
  border-radius: 50%;
  background-color: red;
  width: 35px;
  height: auto;
  font-size: 18px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navbar = () => {
  const [state, dispatch] = useStore();
  // com redux
  // const dispatch = useDispatch()

  const showModalHandler = (type) => {
    // com redux
    // dispatch(action.toggleModal(type));
    // com custom hook
    dispatch("TOGGLE_SHOW", type);
  };

  const totalCart = state.cartItems.length;
  console.log(state.isAuth, state.userID, state.idToken);
  return (
    <Header>
      <Content>
        <ImgLink href="/">
          <img src={Logo} alt="Logo Fashionista" />
        </ImgLink>
        <Nav>
          <Navlista>
            <ListItem>
              <LinkModal onClick={() => showModalHandler("search")}>
                <SearchIcon style={{ fontSize: 35 }} />
              </LinkModal>
            </ListItem>
            <ListItem>
              <LinkModal onClick={() => showModalHandler("cart")}>
                <LocalMallOutlinedIcon style={{ fontSize: 35 }} />
                <TotalItems>{totalCart > 99 ? "+99" : totalCart}</TotalItems>
              </LinkModal>
            </ListItem>
            {state.isAuth ? (
              <ListItem>
                <LinkModal onClick={() => showModalHandler("user")}>
                  <AccountCircleOutlinedIcon style={{ fontSize: 35 }} />
                </LinkModal>
              </ListItem>
            ) : (
              <ListItem>
                <LinkModal
                  onClick={() => showModalHandler("Login")}
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  LOGIN
                </LinkModal>
              </ListItem>
            )}
          </Navlista>
        </Nav>
      </Content>
      <Modal />
    </Header>
  );
};

export default Navbar;
