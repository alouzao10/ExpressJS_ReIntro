//console.log('Hello Node and Express...');

// Importing the node packages and external files/data
import Express from 'express';

import Products from './Products.js';
//import uuid from 'uuid';

// Create an instance of the Node Express Server
const app = Express();

// Include Middleware functions to help parse data from the request
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Set Middleware functions globally within app
// Will be executed before all other actions or functions in the code
//app.use(logger);

// Custom Middleware function
function mid(req, res, next) {
  console.log(req.body); // The body of the data being sent
  console.log(req.params); // The parameters provided by the path
  console.log(req.query); // The query parameters provided by the URL
  next(); // executes the callback function in the current action function
}

function logger(req, res, next) {
  console.log('Welcome...');
  console.log('Execute Middleware...');
}

function auth(req, res, next) {
  console.log('Authenticating...');
  console.log(req.originalUrl);
  if (req.query.admin === 'true') {
    // Is Admin
    // Set and pass variables through the request into the action
    req.admin = true;
    res.send('Welcome Shopper.');
    next();
  } else {
    // No Authentication
    res.send('No Shopper Available.');
  }
}

// HTTP Verbs: GET, PUT, POST, DELETE
// GET = Retrieve information
// PUT = Update information
// POST = Send information
// DELETE = Remove information

// GET Function
app.get('/', logger, (req, res) => {
  res.send('Welcome to the Shop');
});

app.get('/shopper', auth, (req, res) => {
  console.log('Shopper is Admin: ' + req.admin);
  //res.send('Welcome Valued Shopper!!!');
});

app.get('/products/:id', mid, (req, res) => {
  //res.send(req.params.id); // Captures the id provided in the URL path
  var productID = req.params.id;
  var hasProduct = Products.some((item) => item.id === parseInt(productID));
  if (hasProduct) {
    var item = Products[productID];
    res.send(`You Got: ${item.name} for $${item.cost}`);
  } else {
    res.send('Product Out of Stock');
  }
});

// PUT Function
//app.put();

// POST Function
app.post('/add', mid, (req, res) => {
  // Send the data, doesn't return anything
  //console.log(req.body.id); // capture the request content
  console.log(`Adding... ${req.body.name} at $${req.body.cost}`);
  res.sendStatus(200); // can send status to identify success or error
});

// DELETE Function
//app.delete();

const PORT = process.env.PORT || 5000; // Check environment variables or use port 5000
app.listen(PORT, () => {
  console.log('Server Running On Port: ' + PORT);
}); // Run the web server instance
