const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// static
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', require('./routes/index'));
app.use('/issuer', require('./routes/issuer'));
app.use('/verify', require('./routes/verify'));
app.use('/zkproof', require('./routes/zkproof'));

// start
app.listen(PORT, () => {
  console.log(`EduChain Passport running on http://localhost:${PORT}`);
});
