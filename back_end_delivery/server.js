const express = require('express');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/employee', require('./routes/employeeRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes')); 
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/partner', require('./routes/partnerRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/storage', require('./routes/storageRoutes'));

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });

(async () => {
    try {
      await sequelize.sync(); 
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Failed to sync database:', error.message);
    }
  })();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
