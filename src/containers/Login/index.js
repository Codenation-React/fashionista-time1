import React, { useState } from "react";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Loading from "../../components/UI/Loading";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useStore } from "../../store/store";
import axios from "axios";

const LoginContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 480px) {
    align-items: center;
    flex-direction: column;
    justify-content: inherit;
  }
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
  font-size: 20px;
  height: 35px;
  padding: 3px 0px 3px 40px;
  &:focus {
    outline: none;
    border: 2px solid #ccca;
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
  white-space: nowrap;
`;

const LoginSuccess = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuccessParagraph = styled.p`
  font-size: 30px;
`;

const LoginErrorBox = styled.div`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const LoginError = styled.p`
  color: red;
  font-size: 1.6rem;
`;

const Login = () => {
  const [state, dispatch] = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeToRegisterHandler = (type) => {
    dispatch("TOGGLE_SHOW");
    dispatch("TOGGLE_SHOW", type);
  };

  const newAttempt = () => {
    if (error) {
      setError(false);
    }
  };

  const loginHandler = () => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc_Mg5ggNONLHgPMfCQy5gIFPQO0gK_vM";
    setIsLoading(true);
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        dispatch("AUTH_SUCCESS", {
          userID: response.data.localId,
          idToken: response.data.idToken,
        });
        setTimeout(() => {
          dispatch("TOGGLE_SHOW");
          if(state.fromCheckout){
            dispatch("TOGGLE_SHOW", 'cart')
          }
        }, 500);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        console.log(error);
      });
  };

  let content = (
    <LoginContent>
      <LoginForm>
        <LoginLabel htmlFor="email">Email:</LoginLabel>
        <LoginIcon>
          <EmailIcon
            style={{
              fontSize: 30,
              position: "absolute",
              margin: 3,
              borderRight: "1px solid #ccc",
            }}
          />
          <LoginInput
            type="email"
            name="email"
            onClick={(e) => newAttempt()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginIcon>
        <LoginLabel htmlFor="senha">Senha:</LoginLabel>
        <LoginIcon>
          <VpnKeyIcon
            style={{
              fontSize: 30,
              position: "absolute",
              margin: 3,
              borderRight: "1px solid #ccc",
            }}
          />
          <LoginInput
            type="password"
            name="password"
            onClick={(e) => newAttempt()}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginIcon>
        <LoginP>
          Não possui um Cadastro?{" "}
          <LoginStrong onClick={() => changeToRegisterHandler("register")}>
            Registre-se
          </LoginStrong>{" "}
          agora
        </LoginP>
        {error && (
          <LoginErrorBox>
            <LoginError>Email ou Senha invalidos! Tente novamente</LoginError>
          </LoginErrorBox>
        )}
        <LoginBtn onClick={() => loginHandler()}>Sign in</LoginBtn>
      </LoginForm>
    </LoginContent>
  );
  if (isLoading) {
    content = <Loading />;
  }
  if (state.isAuth) {
    content = (
      <LoginContent>
        <LoginSuccess>
          <CheckCircleOutlineIcon style={{ fontSize: 100 }} />
          <SuccessParagraph>Logado com Sucesso!</SuccessParagraph>
        </LoginSuccess>
      </LoginContent>
    );
  }
  return content;
};

export default Login;
