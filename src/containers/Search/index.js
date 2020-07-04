import React, { useState } from 'react';
import styled from 'styled-components';
import Notfound from '../../assets/notfound.png';
import { useStore } from '../../store/store';

const NoResultFound = styled.span`
  font-size: 16px;
  padding: 5px;
`;

const ProductImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  @media (min-width: 480px){
    width: 200px;
  }
`;

const ProductImageDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 20px;
  width: 50%;
  @media (min-width: 480px){
    width: 40%;
  }
`;

const ProductPrice = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 25%;
  @media (min-width: 1280px){
    width: 30%;
    & > .installments {
      font-size: 1rem;
    }
    & > .price {
      font-size: 1.2rem;
    }
  }
  & > .installments {
    color: #aaa;
    font-size: 1.4rem;
    font-weight: bold;
    white-space: nowrap;
  }
  & > .price{
    font-size: 1.6rem;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const SearchBar = styled.input`
  border: 1px solid #ccca;
  border-radius: 10px;
  font-size: 23px;
  font-weight: bold;
  height: 70%;
  padding: 15px;
  width: 90%;
  &:focus {
    border: 2px solid #ccca;
    outline: none;
  }
  @media (min-width: 1280px){
    width: 90%
  }
`;

const SearchContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const SearchDiv = styled.div`
  align-items: center;
  background: #f6f6f6;
  box-shadow: -1px 8px 11px -6px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;
  width: 100%;
  @media (min-width: 1280px){
    width: 100%;
  }
`;

const StyledName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  width: 45%;
  @media (min-width: 1280px){
    height: auto;
    width: 60%;
  }
  @media (min-width: 480px){
    font-size: 16px;
  }
`;

const StyledProduct = styled.a`
  align-items: flex-start;
  box-sizing:border-box;
  border-bottom: 1px solid #eee;
  color: black;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 280px;
  justify-content: flex-start;
  padding: 20px 10px;
  text-decoration: none;
  width: 100%;
`;

const Search = () => {
  const { products } = useStore()[0];
  const [search, setSearch] = useState('');
  const searchProductHandler = event => setSearch(event.target.value);

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

  const filteredProducts = products && products
    .filter(product => removeAcento(product.name).toLowerCase().includes(removeAcento(search).toLowerCase()))
    .map(each => (
      <StyledProduct href={`/product/${each.style}`}>
        <ProductImageDiv>
          <ProductImage src={each.image ? each.image : Notfound} alt='product'/>
        </ProductImageDiv>
        <StyledName>{each.name}</StyledName>
        <ProductPrice>
          <div className='price'>{each.actual_price}</div>
          <div className='installments'>{each.installments}</div>
        </ProductPrice>
      </StyledProduct>
    )
  );

  const result = (Array.isArray(filteredProducts) && filteredProducts.length)
    ? filteredProducts
    : <NoResultFound>Nenhum produto foi encontrado.</NoResultFound>
  ;

  return (
    <>
      <SearchDiv>
        <SearchBar
          type='text'
          value={search}
          placeholder='Buscar por produto...'
          onChange={e => searchProductHandler(e)}
        />
      </SearchDiv>
      <SearchContainer>
        {result}
      </SearchContainer>
    </>
  );
};

export default Search;
