import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useStore } from "../store/store";
import ProductItem from "../components/ProductItem";
import Loading from "../components/UI/Loading";

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
`;

const Container = () => {
  const [state, dispatch] = useStore();
  const products = useMemo(
    () =>
      state.products.map((product) => {
        return <ProductItem key={product.code_color} product={product} />;
      }),
    [state.products]
  );
  
  return (
    <ListContainer>
      <ProductList>{state.IsLoading  ? <Loading /> : products}</ProductList>
    </ListContainer>
  );
};

export default Container;
