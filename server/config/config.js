module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
    jwtSecret: process.env.JWT_SECRET || 'sua_chave_secreta_jwt',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sua_chave_do_stripe'
}; 