import React from 'react';
import Logo from '../../assets/logo-fashionista.svg';
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';


const Header  = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Navlista = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`
const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ListItem = styled.li`
    list-style: none;
    margin: 10px 20px;
`
const ImgDiv = styled.div`
     display: flex;
    align-items: center;
    justify-content: center;
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
    width: 25px;
    height: auto;
    font-size: 0.8rem;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

`
const mockedData = {
    totalCart: 80
}

const Navbar = () => {
    return (
        <Header>
            <Content>
                <ImgDiv>
                    <img src={Logo} alt="Logo Fashionista"/>
                </ImgDiv>
                <Nav>
                    <Navlista>
                        <ListItem>
                            <Link href="/search">
                                <SearchIcon/>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="/cart">
                                <LocalMallOutlinedIcon/>
                                <TotalItems>
                                    { mockedData.totalCart > 99 ? "+99" : mockedData.totalCart }
                                </TotalItems>
                            </Link>
                        </ListItem>
                    </Navlista>
                </Nav>
            </Content>  
        </Header>
    )
}

export default Navbar;