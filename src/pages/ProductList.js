import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ProductItem from '../components/ProductItem/index';

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
`;

const Container = () => {
  const [catalog, setCatalog] = useState([]);
  const fetchCatalog = useCallback(() => {
    const catalogUrl = 'https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog';
    axios.get(catalogUrl)
      .then(response => setCatalog(response.data))
      .catch(error => {
        console.log(`There was an error during the fetch: ${error}`);
      });
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const products = useMemo(() => (
    catalog
      .map(product => (
        <ProductItem product={product} />
      ))
  ), [catalog]);
 console.log(products)
  return (
    <ListContainer>
      <ProductList>
        { products }
      </ProductList>
    </ListContainer>
  );
};

export default Container;
