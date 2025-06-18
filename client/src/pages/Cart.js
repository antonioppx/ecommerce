import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  // TODO: Implementar gerenciamento de estado do carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Produto 1',
      price: 99.99,
      quantity: 2
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 149.99,
      quantity: 1
    }
  ]);

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Carrinho de Compras
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          Seu carrinho está vazio
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantidade: ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" gutterBottom>
              Total: R$ {calculateTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Finalizar Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart; 