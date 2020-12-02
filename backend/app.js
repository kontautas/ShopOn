const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoriesRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use(`/api/v1/items`, itemRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);

module.exports = app;
