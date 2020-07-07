import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { useStore } from "../../store/store";

const MyAccountContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const MyAccountWrapper = styled.div`
  width: 100%;
  justify-content: center;
`;

const MyAccountNav = styled.nav`
  width: 100%;
`;
const MyAccountLinkList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;
const MyAccountLinkItems = styled.li`
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid #ccc;
  border-collapse: collapse;
  align-items: center;
  & > a {
    width: 100%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
  @media (min-width: 480px) {
    height: 70px;
  }
`;
const MyAccountItemsWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
`;

const MyAccount = () => {
  const [state, dispatch] = useStore();

  const onLogout = () => {
    dispatch("LOGOUT");
    dispatch("TOGGLE_SHOW");
  };

  return (
    <MyAccountContent>
      <MyAccountWrapper>
        <MyAccountNav>
          <MyAccountLinkList>
            <MyAccountLinkItems>
              <Link to="/orders" onClick={() => dispatch("TOGGLE_SHOW")}>
                <MyAccountItemsWrapper>
                  ORDERS
                  <ListAltOutlinedIcon style={{ fontSize: 35 }} />
                </MyAccountItemsWrapper>
              </Link>
            </MyAccountLinkItems>
            <MyAccountLinkItems onClick={() => onLogout()}>
              <MyAccountItemsWrapper>
                LOGOUT
                <ExitToAppOutlinedIcon style={{ fontSize: 35 }} />
              </MyAccountItemsWrapper>
            </MyAccountLinkItems>
          </MyAccountLinkList>
        </MyAccountNav>
      </MyAccountWrapper>
    </MyAccountContent>
  );
};

export default MyAccount;
