import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Snackbar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        // Salvar o token no localStorage
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            width: '100%',
            borderRadius: 2,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Bem-vindo de volta!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                py: 1.5,
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Entrar
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Registre-se
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Login realizado com sucesso! Redirecionando...
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;