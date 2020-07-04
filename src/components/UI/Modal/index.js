import React, { useState, useEffect } from 'react'
import Backdrop from '../Backdrop'
import classes from './Modal.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components'
import { useStore } from '../../../store/store';
import Search from '../../../containers/Search/'
import Cart from '../../../containers/Cart';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/modalHandler';

const ModalContainer = styled.div`
    overflow: hidden;
    height: 100vh;
    display: grid;
`

const ModalTopBar = styled.div`
    height: 7rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    justify-content: flex-start;
`
const Content = styled.div`
    width: 80%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
`

const ModalBottomBar = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    height: 50px;
    background: #212529;
    align-self: end;

    div {
        font-size: 1.5rem;
        color: white;
        text-align: center;
        font-weight: bold;
        line-height: 50px;
    }
`


const Modal = props => {
    const [{ show, Navtype, cartItems }, dispatch] = useStore(false);
    // const state = useSelector(state => state.modalHandler);
    // const dispatch = useDispatch();
    const [shouldShow, setShouldShow] = useState(false);
    const [totalValue = 0, setTotalValue] = useState();

    useEffect(() => {
        setShouldShow(show);
    }, [show])

    
    useEffect(() => {
        setTotalValue(cartItems.reduce((accumulator, cartItem) => {
            return accumulator + cartItem.quantity * parseFloat(cartItem.actual_price.replace(/[^0-9,]/g,'').replace(',', '.'));
        }, 0))
    }, [ cartItems ])

    const ModalClasses = [classes.Modal];

    shouldShow ? ModalClasses.push(classes.Open) : ModalClasses.push(classes.Close)

    const closeModal = () => {
        dispatch('TOGGLE_SHOW', Navtype);
        // dispatch(action.toggleModal(state.Navtype))
    }
    const totalCart = cartItems.length
    return (
        <>
            <Backdrop show={shouldShow}/>
            <ModalContainer className={ModalClasses.join(' ')}>
                <ModalTopBar >
                    <ArrowBackIcon style={{fontSize: 30, cursor: 'pointer' }} onClick={() => closeModal()}/>
                    <Content>
                    { Navtype === 'search' ? "Buscando Produtos" : `Sacola (${totalCart})`}
                    </Content>
                </ModalTopBar>
                { Navtype === 'search' ? <Search/> : <Cart />}
                <ModalBottomBar show={Navtype !== 'search'}>
                    <div>Subtotal - R$ {totalValue.toFixed(2).replace('.', ',')}</div>
                </ModalBottomBar>
            </ModalContainer>
        </>

    )
}

export default Modal


