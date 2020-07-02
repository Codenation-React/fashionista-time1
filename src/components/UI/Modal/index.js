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


const Modal = props => {
    const [state, dispatch] = useStore(false);
    // const state = useSelector(state => state.modalHandler);
    // const dispatch = useDispatch();
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        setShouldShow(state.show);
    }, [state.show])

    const ModalClasses = [classes.Modal];

    shouldShow ? ModalClasses.push(classes.Open) : ModalClasses.push(classes.Close)

    const closeModal = () => {
        dispatch('TOGGLE_SHOW', state.Navtype);
        // dispatch(action.toggleModal(state.Navtype))
    }

    return (
        <>
            <Backdrop show={shouldShow}/>
            <div className={ModalClasses.join(' ')}>
                <ModalTopBar >
                    <ArrowBackIcon style={{fontSize: 30, cursor: 'pointer' }} onClick={() => closeModal()}/>
                    <Content>
                    { state.Navtype === 'search' ? "Buscando Produtos" : `Sacola (${5})`}
                    </Content>
                </ModalTopBar>
                { state.Navtype === 'search' ? <Search/> : <Cart />}
            </div>
        </>

    )
}

export default Modal


