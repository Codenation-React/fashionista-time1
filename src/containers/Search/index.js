import React, { useState } from "react";
import styled from "styled-components";
import Notfound from "../../assets/notfound.png";
import { useStore } from "../../store/store";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import { Link } from "react-router-dom";
import { formatText } from '../../shared/utility';

const NoResultFound = styled.span`
  margin: auto 0;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: #ccc;
`;

const ProductImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  @media (min-width: 480px) {
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
  @media (min-width: 480px) {
    width: 40%;
  }
`;

const ProductPrice = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 25%;
  @media (min-width: 1280px) {
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
  & > .price {
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
  @media (min-width: 1280px) {
    width: 90%;
  }
`;

const SearchContainer = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

const SearchDiv = styled.div`
  align-items: center;
  background: #f6f6f6;
  box-shadow: -1px 8px 11px -6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;
  width: 100%;
  @media (min-width: 1280px) {
    width: 100%;
  }
`;

const StyledName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  width: 45%;
  @media (min-width: 1280px) {
    height: auto;
    width: 60%;
  }
  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

const StyledProduct = styled.a`
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  width: 100%;
  a {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 280px;
    justify-content: flex-start;
    padding: 20px 10px;
    text-decoration: none;
    width: 100%;
    color: black;
  }
`;

const NewSearchDiv = styled.div`
  margin: auto 0;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: #ccc;
`;

const Search = () => {
  const [{ products }, dispatch] = useStore();
  const [search, setSearch] = useState("");
  const [isTouched, setIsTouched] = useState("");
  const searchProductHandler = (event) => {
    setSearch(event.target.value);
    setIsTouched(true);
    if (event.target.value.length === 0) {
      setIsTouched(false);
    }
  };

  const removeAcento = (text) => {
    text = text.toLowerCase();
    text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
    text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
    text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
    text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
    text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
    text = text.replace(new RegExp("[Ç]", "gi"), "c");
    return text;
  };

  const filteredProducts =
    products &&
    products
      .filter((product) =>
        removeAcento(product.name)
          .toLowerCase()
          .includes(removeAcento(search).toLowerCase())
      )
      .map((product) => (
        <StyledProduct key={product.code_color}>
          <Link
            to={{
              pathname: `/product/${formatText(product.name)}`,
            }}
            onClick={() => dispatch("TOGGLE_SHOW")}
          >
            <ProductImageDiv>
              <ProductImage
                src={product.image ? product.image : Notfound}
                alt="product"
              />
            </ProductImageDiv>
            <StyledName>{product.name}</StyledName>
            <ProductPrice>
              <div className="price">{product.actual_price}</div>
              <div className="installments">{product.installments}</div>
            </ProductPrice>
          </Link>
        </StyledProduct>
      ));
  let result = (
    <NewSearchDiv>
      <SearchOutlinedIcon style={{ fontSize: 100, color: "#CCC" }} />
      Procure por um produto
    </NewSearchDiv>
  );
  if (isTouched) {
    result =
      Array.isArray(filteredProducts) && filteredProducts.length ? (
        filteredProducts
      ) : (
        <NoResultFound>
          <SentimentDissatisfiedOutlinedIcon
            style={{ fontSize: 100, color: "#CCC" }}
          />
          Nenhum produto foi encontrado.
        </NoResultFound>
      );
  }

  return (
    <>
      <SearchDiv>
        <SearchBar
          type="text"
          value={search}
          placeholder="Buscar por produto..."
          onChange={(e) => searchProductHandler(e)}
        />
      </SearchDiv>
      <SearchContainer>{result}</SearchContainer>
    </>
  );
};

export default Search;
