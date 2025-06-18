import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      title: 'Produtos de Qualidade',
      description: 'Encontre os melhores produtos com os melhores preços'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Compra Segura',
      description: 'Seus dados estão protegidos com a mais alta tecnologia'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Entrega Rápida',
      description: 'Receba seus produtos em tempo recorde'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Bem-vindo à Nossa Loja
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Encontre os melhores produtos com os melhores preços
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/products')}
              sx={{ px: 4, py: 1.5 }}
            >
              Ver Produtos
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ px: 4, py: 1.5 }}
            >
              Entrar
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Produtos em Destaque
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://source.unsplash.com/random/300x200?product=${item}`}
                    alt={`Produto ${item}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      Produto {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Descrição do produto em destaque
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/products')}
                    >
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 