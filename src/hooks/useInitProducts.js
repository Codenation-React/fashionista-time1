import { useEffect, useState } from 'react';
import axios from 'axios';

import { useStore } from "../store/store";

const useInitProducts = () => {
    const [state, dispatch] = useStore(false);
    const [products, setProducts] = useState()
    useEffect(() => {
        if (state.products.length > 0) {
          return setProducts(state.products)
        }
        const catalogUrl =
          "https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog";
        const catalogUrl2 = "https://undefined.netlify.app/api/catalog";
    
        axios
          .get(catalogUrl)
          .then((response) => {
            dispatch('INIT_PRODUCTS', response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            axios
              .get(catalogUrl2)
              .then((response) => {
                dispatch('INIT_PRODUCTS', response.data);
                setProducts(response.data);
              })
              .catch((error) => {
                console.log(`There was an error during the fetch: ${error}`);
              });
            console.log(`There was an error during the fetch: ${error}`);
          });
      }, []);
      return products

}

export default useInitProducts