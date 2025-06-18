import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: Implementar chamada à API
    // Por enquanto, usando dados mockados
    setProducts([
      {
        id: 1,
        name: 'Produto 1',
        price: 99.99,
        description: 'Descrição do produto 1',
        image: 'https://via.placeholder.com/200'
      },
      {
        id: 2,
        name: 'Produto 2',
        price: 149.99,
        description: 'Descrição do produto 2',
        image: 'https://via.placeholder.com/200'
      },
      // Adicione mais produtos mockados aqui
    ]);
  }, []);

  const handleAddToCart = (product) => {
    // TODO: Implementar lógica do carrinho
    console.log('Adicionar ao carrinho:', product);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    R$ {product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products; 