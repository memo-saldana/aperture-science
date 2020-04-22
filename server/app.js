// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      PORT = process.env.PORT || 3000,
      aHandler = require('express-async-handler'),
      eHandler = require('./middleware/errorHandling'),
      sendAsJSON = require('./middleware/sendAsJson'),
      // Routers
      projectRoutes = require('./Projects'),
      authRoutes = require('./Authentication');

// DB Setup
require('./config/dbSetup');

app.use(logger('dev'));
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Serves build
app.use(express.static(path.resolve('./client/build')));

// Routes
app.use('/api', authRoutes);
app.use('/api/projects', projectRoutes); 
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
  console.log('Server up and running on port ' + PORT)
})