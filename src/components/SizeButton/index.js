import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 5px;
  margin-right: 0.7rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.selectedStyle ? "#16161d" : "white")};
  color: ${(props) =>
    props.selectedStyle ? "white" : props.disabled ? "#ccc" : "black"};
  border: 1px solid rgba(0, 0, 0, 0.1);

  cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
`;

const SizeButton = ({ disabled, size, onClickHandler, selected }) => {
  

  const selectedHandler = () => {
      if(selected){
        return onClickHandler('');
      }
    return onClickHandler(size);
  };

  return (
    <StyledButton
      selectedStyle={selected}
      disabled={disabled}
      onClick={() => selectedHandler()}
    >
      {size}
    </StyledButton>
  );
};

export default SizeButton;
