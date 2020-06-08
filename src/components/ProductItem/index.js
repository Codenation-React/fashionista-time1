import React from "react";
import styled from 'styled-components';

const ListItem = styled.li`
  list-style-type: none;
  margin: 15px;
  width: 470px;
`
const ImgItem = styled.div`
  position: relative;
`
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
`
const DescItem = styled.a`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
`
const TitleItem = styled.a`
  font-size: 1.4rem;
  font-weight: 650;
  margin-top: 5px;
  margin-bottom: 0;
`
const DescPriceItem = styled.div`
  text-align: center;
`
const PriceItem = styled.a`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.2rem 0;
`
const PriceItemOld = styled.a`
  font-size: 1.5rem;
  color: #808080;
  text-decoration: solid line-through #808080;
`

/*
const product = {
  name: "VESTIDO TRANSPASSE BOW",
  image: "https://viniciusvinna.netlify.app/assets/api-fashionista/20002605_615_catalog_1.jpg",
  actual_price: "R$ 175,90",
  on_sale: true,
  discount_percentage: "12%",
  regular_price: "R$ 199,90"
} 
*/

const ProductItem = ({ product }) => {
//const ProductItem = () => {

  const { name, image, actual_price, on_sale, discount_percentage, regular_price } = product;

  return (
    <ListItem>
      <ImgItem>
        <img src={image} alt={name} />

        {on_sale &&
          (<DiscountItem> -{discount_percentage} OFF</DiscountItem>)}
      </ImgItem>

      <DescItem>
        <TitleItem>{name}</TitleItem>
      </DescItem>

      <DescPriceItem>
        {on_sale &&
          (<PriceItemOld>{regular_price}</PriceItemOld>)}

        <PriceItem>{actual_price}</PriceItem>
      </DescPriceItem>

    </ListItem>
  );
};

export default ProductItem;