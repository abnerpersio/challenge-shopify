import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Product from './Product';

import { useAuth } from '../AuthProvider';

export default function ProductList() {
  const { user } = useAuth();
  const [productsList, setProductsList] = useState([]);
  const [likedList, setLikeList] = useState([]);

  const getProducts = async () => {
    const credentials = {
      username: JSON.parse(user).username,
      password: JSON.parse(user).password,
    };

    const response = await fetch('../../products', {
      headers: credentials,
    });

    const responseLiked = await fetch('../../likes', {
      headers: credentials,
    });

    const products = await response.json();
    const liked = await responseLiked.json();
    setProductsList(products);
    setLikeList(liked);
  };

  const likeProduct = async (id) => {
    const credentials = {
      username: JSON.parse(user).username,
      password: JSON.parse(user).password,
    };

    const response = await fetch(`../../likes/${id}`, {
      method: 'POST',
      headers: credentials,
    });

    if (response.status === 200) {
      getProducts();
    } else alert('algo errado ocorreu :(');
  };

  const unlikeProduct = async (id) => {
    const credentials = {
      username: JSON.parse(user).username,
      password: JSON.parse(user).password,
    };

    const response = await fetch(`../../likes/${id}`, {
      method: 'DELETE',
      headers: credentials,
    });

    if (response.status === 204) {
      getProducts();
    } else alert('algo errado ocorreu :(');
  };

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, [user]);

  const isLiked = (id) =>
    likedList.find((item) => item.product_id === String(id));

  const renderProductList = () => {
    return productsList?.map((product) => {
      return (
        <Col lg={4}>
          <Product
            title={product.title}
            id={product.id}
            key={product.id}
            images={product.images}
            liked={isLiked(product.id)}
            liker={likeProduct}
            unliker={unlikeProduct}
          />
        </Col>
      );
    });
  };

  return (
    <Container className="mt-5">
      <h4>Lista de produtos disponíveis</h4>
      <Row>{renderProductList()}</Row>
    </Container>
  );
}
