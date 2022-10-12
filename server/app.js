const express = require('express');
let cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
 
const app = express();

// app.use(cors({
//   origin: true,
//   credentials: true
// }));

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
}));
app.set("trust proxy",1);

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   // res.header('Access-Control-Allow-Origin', req.headers.origin);
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // next();
//   console.log('Hello from the middleware 👋');

//   next();
// });

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.get("/",function(req,res) { 
  res.cookie("mycookie",'express');
  res.end("cookies inserted…");
  });


app.use('/api/v1/users', userRouter);

module.exports = app;
  