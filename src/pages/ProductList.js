import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from '../store/store'
import ProductItem from '../components/ProductItem';

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
  const [catalog, setCatalog] = useState([]);
  const [state, dispatch] = useStore(false);
  const fetchCatalog = useCallback(() => {
    const catalogUrl = 'https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog';
    const catalogUrl2 = 'https://undefined.netlify.app/api/catalog'
    axios.get(catalogUrl)
      .then(response => { 
        setCatalog(response.data);
        dispatch("INIT_PRODUCTS", catalog);
      })
      .catch(error => {
        // setCatalog(mockData);
        axios.get(catalogUrl2)
          .then(response => {
              setCatalog(response.data);
              dispatch("INIT_PRODUCTS", catalog);
            })
          .catch(error => {
            console.log(`There was an error during the fetch: ${error}`);
          })
        console.log(`There was an error during the fetch: ${error}`);
      });

  }, []);

  useEffect(() => {
    fetchCatalog();
    
  }, [fetchCatalog]);

  useEffect(() => {
    dispatch("INIT_PRODUCTS", catalog);
  }, [catalog])

  const products = useMemo(() => (
    catalog
      .map(product => {
        return <ProductItem key={product.code_color} product={product} />
      })
  ), [catalog]);

  return (
    <ListContainer>
      <ProductList>
        { products }
      </ProductList>
    </ListContainer>
  );
};

export default Container;
