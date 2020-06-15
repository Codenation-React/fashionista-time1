import React from 'react'
import styled from 'styled-components';

const StyledBackdrop = styled.div`
    position: fixed;
    display: ${props => props.show ? 'block' : 'none'};
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
`
  





const Backdrop = (props) => {
    return (
        <StyledBackdrop show={props.show}/>
    )
}

export default Backdrop
