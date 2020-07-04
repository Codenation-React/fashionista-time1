import React,  {useState, useEffect} from 'react'
import styled from 'styled-components';
import Notfound from '../../assets/notfound.png';
import { useStore } from '../../store/store';

const SearchContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
`

const SearchDiv = styled.div`
    background: #f6f6f6;
    height: 60px;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    box-shadow: -1px 8px 11px -6px rgba(0,0,0,0.2);
    @media (min-width: 1280px){
        width: 100%
    }
    `
const SearchBar = styled.input`
    width: 90%;
    height: 70%;
    border: 1px solid #ccca;
    border-radius: 10px;
    font-size: 23px;
    font-weight: bold;
    padding: 0px 15px;
    &:focus {
        outline: none;
        border: 2px solid #ccca;
    }
    @media (min-width: 1280px){
        width: 90%
    }
`
const StyledProduct = styled.a`
    width: 100%;
    box-sizing:border-box;
    padding: 20px 10px;
    text-decoration: none;
    color: black;
    height: 280px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #eee;

`
const ProductImageDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    @media (min-width: 480px){
        width:40%
    }
`

const ProductImage = styled.img`
    width: 100%;;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    @media (min-width: 480px){
        width: 200px
    }
`

const ProductPrice = styled.div`
    width:25%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (min-width: 1280px){
        width: 30%;
        & > .price {
            font-size: 1.2rem
        }
        & > .installments {
            font-size: 1rem
        }
    }
    & > .price{
        font-size:1.6rem;
        font-weight:bold;
        white-space: nowrap;
    }
    & > .installments {
        font-size: 1.4rem;
        font-weight: bold;
        white-space: nowrap;
        color: #aaa
    }
`
const StyledName = styled.div`

    font-size: 1.5rem;
    font-weight: bold;
    width: 45%;
    @media (min-width: 1280px){
        width: 60%;
        height: auto;
    }
    @media (min-width: 480px){
        font-size: 16px;
    }
`
const Search = () => {
    const state = useStore()[0];
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([])
    const searchProductHandler = (event) => {
        setSearch(event.target.value);
       
    }

    const removeAcento = (text) => {
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;                 
    }

    useEffect(() => {
        if((search.length + 1) > 3 ){
            let filteredProducts = state.products.filter((product) => {
                return (
                    removeAcento(product.name.toLowerCase())
                        .indexOf(removeAcento(search.toLowerCase())) !== -1
                )
            })
            setProducts(filteredProducts);
        }else{
            setProducts([]);
        }
    }, [search, state])

    return (
        <React.Fragment>
            <SearchDiv>
                <SearchBar 
                    type="text" 
                    value={search} 
                    placeholder="Buscar por produto..." 
                    onChange={(e) => searchProductHandler(e)}
                />
            </SearchDiv>
            <SearchContainer>
                {
                products && products.map(each => (
                        <StyledProduct href={`/product/${each.style}`}>
                            <ProductImageDiv>
                                <ProductImage src={each.image ? each.image : Notfound} alt="product"/>
                            </ProductImageDiv>
                            <StyledName>{each.name}</StyledName>
                            <ProductPrice>
                                <div className="price">{each.actual_price}</div>
                                <div className="installments">{each.installments}</div>
                            </ProductPrice>
                        </StyledProduct>
                    ))
                }
            </SearchContainer>
        </React.Fragment>
    )
}

export default Search
