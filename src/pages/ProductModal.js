import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../store/store";

import { formatText } from "../shared/utility";
import axios from "axios";

import Loading from "../components/UI/Loading";
import notFoundLogo from "../assets/notfound.png";
import SizeButton from "../components/SizeButton";

const ItemDetail = styled.section`
  margin-top: 1rem;
  list-style-type: none;
  margin: 15px;
  width: 900px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 600px;
  border-bottom: 1px solid #d0d0d0;
  padding: 15px;
`;

const ItemDetailImage = styled.div`
  position: relative;
`;

const DiscountItem = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #303030;
  padding: 0.2rem 0.6rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const ItemDetailDescription = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1.5rem 1rem;
  position: relative;
  margin: 1rem;
`;

const ItemDetailHeader = styled.div``;

const ItemDetailTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ItemDetailPriceOld = styled.p`
  font-size: 1rem;
  color: #808080;
  text-decoration: solid line-through #808080;
`;

const ItemDetailPrice = styled.p`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0.2rem 0;
`;
const ItemDetailInstallments = styled.span`
  font-size: 1rem;
  color: #808080;
`;

const ItemDetailOptions = styled.p``;

const ItemDetailButtons = styled.div`

`

const ButtonAddBag = styled.button`
  background-color: #303030;
  color: #fff;
  padding: 1rem 3rem;
  border: none;
  border-radius: 5px;
  margin: 1rem;
  cursor: pointer;
`;

const ProductModal = (props) => {
  const [product, setProduct] = useState({});
  const [state, dispatch] = useStore(false);

  const addProduct = (size) => {
    setProduct({ ...product, size: size, quantity: 1 });

  }

  useEffect(() => {
    if (state.products.length > 0) {
      return setProduct(
        state.products.find((item) => {
          return formatText(item.name) === props.match.params.id;
        })
      );
    }
    const catalogUrl =
      "https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog";
    const catalogUrl2 = "https://undefined.netlify.app/api/catalog";

    axios
      .get(catalogUrl)
      .then((response) => {
        dispatch('INIT_PRODUCTS', response.data);
        setProduct(
          response.data.find((item) => {
            return formatText(item.name) === props.match.params.id;
          })
        );
      })
      .catch((error) => {
        axios
          .get(catalogUrl2)
          .then((response) => {
            dispatch('INIT_PRODUCTS', response.data);
            setProduct(
              response.data.find((item) => {
                return formatText(item.name) === props.match.params.id;
              })
            );
          })
          .catch((error) => {
            console.log(`There was an error during the fetch: ${error}`);
          });
        console.log(`There was an error during the fetch: ${error}`);
      });
  }, []);

  let content = <Loading />;

  let btns;

  if (product.sizes) {
    btns = product.sizes.map((sku) => {
      return (
        <SizeButton
          key={sku.sku}
          disabled={!sku.available}
          size={sku.size}
          onClickHandler={() => addProduct(sku.size)}
        />
      );
    });
  }

  if (product) {
    content = (
      <ItemDetail>
        <Container>
          <ItemDetailImage>
            <img src={product.image || notFoundLogo} alt={product.name} />
            {product.on_sale && (
              <DiscountItem> -{product.discount_percentage} OFF</DiscountItem>
            )}
          </ItemDetailImage>

          <ItemDetailDescription>
            <ItemDetailHeader>
              <ItemDetailTitle>{product.name}</ItemDetailTitle>

              {product.on_sale && (
                <ItemDetailPriceOld>{product.regular_price}</ItemDetailPriceOld>
              )}

              <ItemDetailPrice>
                {product.actual_price}
                <ItemDetailInstallments>
                  {" "}
                  em até {product.installments}
                </ItemDetailInstallments>
              </ItemDetailPrice>
            </ItemDetailHeader>

            <ItemDetailOptions>
              Escolha o tamanho:
            </ItemDetailOptions>
            <ItemDetailButtons>
              {btns}
            </ItemDetailButtons>

            <ButtonAddBag onClick={() => dispatch("ADD_TO_CART", product)}>
              Adicionar à Sacola
            </ButtonAddBag>
          </ItemDetailDescription>
        </Container>
      </ItemDetail>
    );
  }

  return content;
};

export default ProductModal;
