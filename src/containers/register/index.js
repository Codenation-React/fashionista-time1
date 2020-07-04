import React, { useState } from "react";
import styled from "styled-components";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useStore } from "../../store/store";
import axios from "axios";

const LoginContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.div`
  display: flex;
  width: 85%;
  justify-content: center;
  flex-direction: column;
`;

const LoginLabel = styled.label`
  font-size: 2.3rem;
  margin-top: 15px;
  font-weight: bold;
`;

const LoginInput = styled.input`
  width: 100%;
  border: 1px solid #ccca;
  border-radius: 4px;
  font-size: 23px;
  padding: 3px 0px 3px 40px;
  &:focus {
    outline: none;
    border: 2px solid #ccca;
  }
  @media (min-width: 1280px) {
    width: 90%;
  }
`;

const LoginIcon = styled.div`
  display: flex;
  /* justify-content: center; */
  align-content: center;
`;

const LoginBtn = styled.button`
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
const LoginP = styled.p`
  font-size: 16px;
`;

const LoginStrong = styled.strong`
  cursor: pointer;
  font-size: 17px;
  color: red;
`;

const Register = () => {
  const [state, dispatch] = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeToRegisterHandler = (type) => {
    dispatch("TOGGLE_SHOW");
    dispatch("TOGGLE_SHOW", type);
  };
  const styledIcon = {
    fontSize: 30,
    position: "absolute",
    margin: 3,
    borderRight: "1px solid #ccc",
  };

  const register = () => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc_Mg5ggNONLHgPMfCQy5gIFPQO0gK_vM";
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <LoginContent>
      <LoginForm>
        <LoginLabel htmlFor="email">Seu E-mail:</LoginLabel>
        <LoginIcon>
          <EmailIcon style={styledIcon} />
          <LoginInput
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginIcon>
        <LoginLabel htmlFor="senha">Sua senha:</LoginLabel>
        <LoginIcon>
          <VpnKeyIcon style={styledIcon} />
          <LoginInput
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginIcon>
        <LoginP>
          ja possui um Cadastro?{" "}
          <LoginStrong onClick={() => changeToRegisterHandler("login")}>
            Faça Login
          </LoginStrong>{" "}
          agora
        </LoginP>
        <LoginBtn onClick={() => register()}>Sign up</LoginBtn>
      </LoginForm>
    </LoginContent>
  );
};

export default Register;
