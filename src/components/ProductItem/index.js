import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import notFoundLogo from '../../assets/notfound.png';
import { formatText } from '../../shared/utility';

const ListItem = styled.li`
  list-style-type: none;
  margin: 15px;
  width: 235px;
  transition: transform 0.35s ease-out;
  & > a {
    text-decoration: none;
    color: #303030;
  }
  &:hover {
    box-shadow: 0 22px 22px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;
const ImgItem = styled.div`
  position: relative;
  & > img {
    max-width: 100%;
    height: auto;
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
const DescItem = styled.a`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
`;
const TitleItem = styled.p`
  font-size: 1.4rem;
  font-weight: 650;
  margin-top: 5px;
  margin-bottom: 0;
`;
const DescPriceItem = styled.div`
  text-align: center;
`;
const PriceItem = styled.a`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.2rem 0;
`;
const PriceItemOld = styled.a`
  font-size: 1.5rem;
  color: #808080;
  margin-right: 7px;
  text-decoration: solid line-through #808080;
`;

const ProductItem = ({ product }) => {
  const {
    name,
    image,
    actual_price,
    on_sale,
    discount_percentage,
    regular_price,
  } = product;

  const imageItem = image || notFoundLogo;

  const newName = formatText(name);

  return (
    <ListItem>
      <Link to={{
        pathname: `/product/${newName}`,
        state: product,
      }}>
        <ImgItem>
          <img src={imageItem} alt={name} />
          {on_sale &&
            (<DiscountItem> -{discount_percentage} OFF</DiscountItem>)}
        </ImgItem>

        <DescItem>
          <TitleItem>{name}</TitleItem>
        </DescItem>
      </Link>

      <DescPriceItem>
        {on_sale && <PriceItemOld>{regular_price}</PriceItemOld>}

        <PriceItem>{actual_price}</PriceItem>
      </DescPriceItem>
    </ListItem>
  );
};

export default ProductItem;
