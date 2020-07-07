import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;  
  border: none;
  margin: 0;
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-right: 0.7rem;
  outline: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const SizeButton = ({ disabled, size, onClickHandler }) => {
  return (
    <StyledButton disabled={disabled} onClick={() => onClickHandler(size)}>
      {size}
    </StyledButton>
  );
};

export default SizeButton;
