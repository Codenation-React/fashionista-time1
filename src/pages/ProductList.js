import React, { useEffect, useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import { useStore } from "../store/store";
import ProductItem from "../components/ProductItem";
import Loading from "../components/UI/Loading";
import axios from 'axios';

const ListContainer = styled.div`
  background-color: #FAFAFA;
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
  const [state, dispatch] = useStore(false);
  const [catalog, setCatalog] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const fetchCatalog = useCallback(() => {
    const catalogUrl =
      "https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog";
    const catalogUrl2 = "https://undefined.netlify.app/api/catalog";
    axios
      .get(catalogUrl)
      .then((response) => {
        setCatalog(response.data);
        state.products && setIsLoading(false);
      })
      .catch((error) => {
        axios
          .get(catalogUrl2)
          .then((response) => {
            setCatalog(response.data);
            state.products && setIsLoading(false);
          })
          .catch((error) => {
            console.log(`There was an error during the fetch: ${error}`);
          });
        console.log(`There was an error during the fetch: ${error}`);
      });
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    dispatch("INIT_PRODUCTS", catalog);
  }, [catalog]);

  const products = useMemo(
    () =>
      catalog.map((product) => {
        return <ProductItem key={product.code_color} product={product} />;
      }),
    [catalog])

  return (
    <ListContainer>
      <ProductList>{IsLoading  ? <Loading /> : products}</ProductList>
    </ListContainer>
  );
};

export default Container;
