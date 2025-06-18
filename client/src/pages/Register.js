import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Snackbar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/registro', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar usuário');
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
            Criar Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
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
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
              Criar Conta
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Já tem uma conta?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Faça login
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
          Conta criada com sucesso! Redirecionando para o login...
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register; 