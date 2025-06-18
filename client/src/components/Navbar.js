import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          E-Commerce
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/products')}>
            Produtos
          </Button>
          
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={0} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 