// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      PORT = process.env.PORT || 4000,
      eHandler = require('./middleware/errorHandling'),
      sendAsJSON = require('./middleware/sendAsJson'),
      adminConfig = require('./config/adminSetup'),
      // Routers
      projectRoutes = require('./Projects'),
      authRoutes = require('./Authentication');
      categoryRoutes = require('./Categories');
      paymentRoutes = require('./Payment');
      userRoutes = require('./User');

// DB Setup
require('./config/dbSetup');

app.use(logger('dev'));
app.use(cors());

app.use((req, res, next) => {
  if(req.originalUrl === '/api/donate') {
    bodyParser.raw({type: 'application/json'})(req,res,next);
  } else {
    express.json()(req,res,next);
  }
})

// Serves build
app.use(express.static(path.resolve('./client/build')));

// Routes
app.use('/api', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api/', projectRoutes); 
app.use('/api/categories', categoryRoutes); 
app.use('/api/users', userRoutes);

// Error handling
app.use(eHandler());
app.use(sendAsJSON());

// Redirects everything else to index
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

app.get('/*', (req,res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
})

app.listen(PORT, _ => {
  adminConfig()
  .then(_ => {
    console.log('Server up and running on port ' + PORT)
  });
});