require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/', routes);
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server is up on ${PORT} http://localhost:${PORT}`);
});
