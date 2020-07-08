import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../store/store";

import { formatText } from "../shared/utility";
import axios from "axios";

import Loading from "../components/UI/Loading";
import notFoundLogo from "../assets/notfound.png";
import SizeButton from "../components/SizeButton";
import useInitProducts from "../hooks/useInitProducts";

const ItemDetail = styled.section`
  margin-top: 1rem;
  list-style-type: none;
  margin: 15px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d0d0d0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 15px;
  justify-content: center;
  @media (min-width: 780px) {
    flex-direction: row;
    width: 80%;
  }
`;

const ItemDetailImage = styled.div`
  position: relative;
  img {
    height: 100%;
    width: 100%;
  }
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
  max-width: 800px;
  padding: 1.5rem 1rem;
  position: relative;
  margin: 1rem;
`;

const ItemDetailHeader = styled.div``;

const ItemDetailTitle = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
`;

const ItemDetailPriceOld = styled.p`
  font-size: 1.2rem;
  color: #808080;
  text-decoration: solid line-through #808080;
`;

const ItemDetailPrice = styled.p`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.2rem 0;
`;
const ItemDetailInstallments = styled.span`
  white-space: nowrap;
  font-size: 1.3rem;
  color: #808080;
`;

const ItemDetailOptions = styled.p`
  font-size: 1.3rem;
`;

const ItemDetailButtons = styled.div`
  white-space: nowrap;
`;

const ButtonAddBag = styled.button`
  background-color: #303030;
  color: #fff;
  padding: 1rem 2.3rem;
  font-size: 1.4rem;
  border: none;
  width: 20rem;
  height: 5rem;
  border-radius: 5px;
  margin: 2rem auto;
  cursor: pointer;
`;

const SuccessModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    transform: translateY(${props => props.shouldShow ? '100%' : '-1000%'});
    transition: transform 0.3s ease-in-out;
    z-index: 1002;
    width: 250px;
    @media(min-width: 480px){
      width: 300px;
      height: 70px;
    }
    height: 60px;
    margin: 0 auto;
    white-space: nowrap;
    font-size: 2rem;
    background-color: white;
    box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.47);
`

const ProductModal = (props) => {
  const [product, setProduct] = useState({});
  const [{ cartItems }, dispatch] = useStore(false);
  const [showModal, setShowModal] = useState(false);
  const products = useInitProducts();

  const addProduct = (size) => {
    product.size && product.quantity
      ? size === product.size || size === ''
        ? setProduct({ ...product, size: "", quantity: 0 })
        : setProduct({ ...product, size: size, quantity: 1 })
      : setProduct({ ...product, size: size, quantity: 1 });
  };

  useEffect(() => {
    products &&
      setProduct(
        products.find((item) => {
          return formatText(item.name) === props.match.params.id;
        })
      );
  }, [products, props.match.params.id]);

  let addToCart = () => {
    const validProduct =
      cartItems &&
      cartItems.filter(
        (item) =>
          item.code_color === product.code_color && item.size === product.size
      )[0];
    if (validProduct)
      dispatch("INCREMENT_QUANTITY", {
        code_color: product.code_color,
        size: product.size,
      });
    else dispatch("ADD_TO_CART", product);
    setShowModal(true);
    setTimeout(() => {
      if(setShowModal){
        setShowModal(false)
      }
    }, 500)
  };

  let content = <Loading />;

  let btns;
  console.log(product);
  if (product.sizes) {
    btns = product.sizes.map((sku) => {
      return (
        <SizeButton
          key={sku.sku}
          selected={sku.size === product.size}
          disabled={!sku.available}
          size={sku.size}
          onClickHandler={() => addProduct(sku.size)}
        />
      );
    });
  }

  if (Object.values(product).length) {
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

            <ItemDetailOptions>Escolha o tamanho:</ItemDetailOptions>
            <ItemDetailButtons>{btns}</ItemDetailButtons>

            <ButtonAddBag disabled={product.size && product.size.length ? false : true} onClick={addToCart}>Adicionar à Sacola</ButtonAddBag>
          </ItemDetailDescription>
          <SuccessModal shouldShow={showModal}>Item adicionado a sacola!</SuccessModal>
        </Container>
      </ItemDetail>
    );
  }

  return content;
};

export default ProductModal;
