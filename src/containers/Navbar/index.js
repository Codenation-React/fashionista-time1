import React from 'react';
import Logo from '../../assets/clothes.svg';
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Modal from '../../components/UI/Modal'
import { useStore } from '../../store/store';
// import { useDispatch } from 'react-redux';
// import * as action from '../../actions/modalHandler';

const Header  = styled.header`
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Navlista = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

`
const Nav = styled.nav`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ListItem = styled.li`
    list-style: none;
    margin: 10px 10px;
`
const ImgLink = styled.a`
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: flex-start;
    & > img {
        @media(min-width: 480px){
            width: 100px;
        }
        height: 50px;
    }
`

const Link = styled.a`
    text-decoration:none;
    color: #000;
    display: flex;
    cursor: pointer;
`
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

`
const mockedData = {
    totalCart: 5
}

const Navbar = () => {
    const dispatch = useStore()[1];
    // com redux
    // const dispatch = useDispatch()

    const showModalHandler = type => {
        // com redux
        // dispatch(action.toggleModal(type));
        // com custom hook
        dispatch('TOGGLE_SHOW', type)
    }

    return (
        <Header>
            <Content>
                <ImgLink href="/">
                    <img src={Logo} alt="Logo Fashionista"/>
                </ImgLink>
                <Nav>
                    <Navlista>
                        <ListItem>
                            <Link onClick={() => showModalHandler('search')}>
                                <SearchIcon style={{ fontSize: 35 }}/>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link onClick={() => showModalHandler('cart')}>
                                <LocalMallOutlinedIcon style={{ fontSize: 35 }}/>
                                <TotalItems>
                                    { mockedData.totalCart > 99 ? "+99" : mockedData.totalCart }
                                </TotalItems>
                            </Link>
                        </ListItem>
                    </Navlista>
                </Nav>
            </Content>
            <Modal/>
        </Header>
    )
}

export default Navbar;