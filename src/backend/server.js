process.env.NODE_ENV = 'dev';
const config = require('./config');
const cors = require('cors');

const express = require('express');
const app = express();
// var whitelist = ['http://locahost:3000/api','http://localhost:8080/api'];
// var corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }
// app.use(cors(corsOptions));
app.use(cors());
const router = express.Router();
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const pool = require('./database/pool');
var client = require('./database/client');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const port = config.app.port;
app.listen(port, () => console.log(`Server started on port ${port}`));

// postgres pool & client
app.set('pool', pool);
app.set('client', client);

// routers:
// route /api - get | indexRouter
// route /api/item - get | itemRouter
var indexRouter = require('./routes/indexRouter');
var itemRouter = require('./routes/itemRouter');
var recipeRouter = require('./routes/recipeRouter');
var personalInfoRouter = require('./routes/personalInfoRouter');
// var itemDetailRouter = require('./routes/itemDetailRouter');

app.use('/api/', indexRouter);
app.use('/api/item/', itemRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/personalinfo', personalInfoRouter);
// app.use('/api/products', productRouter);
// app.use('/api/itemdetail/',itemDetailRouter);
