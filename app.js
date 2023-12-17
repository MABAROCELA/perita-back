const createError = require('http-errors');
const express = require('express');
require('./database/conexion');
const session = require('express-session');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const MongoStore = require('connect-mongo');
const nodemailer = require('nodemailer');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const path = require('path');
require('dotenv').config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.URL_ATLAS,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}

));

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  const user = req.session.user;

  if (user) {
    res.json({ message: 'Usuario autenticado', user });
    console.log(user);
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
});

//SUSCRIPCIÓN A LISTA DE DIFUSIÓN

app.post('/enviar-correo', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Dirección de correo electrónico no proporcionada');
  }

  let transportador = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERGMAIL,
      pass: process.env.PASSGMAIL
    }
  });

  try {
    await transportador.sendMail({
      from: process.env.USERGMAIL,
      to: email,
      subject: 'Hola! te damos la bienvenida a PERITA!',
      html: '<h1>Gracias por registrarte!</h1>'
    });

    res.send('Correo enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el correo');
  }
});

app.use('/users', userRouter);
app.use('/products', productRouter);



// MANEJO DE ERRORES

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ message: err.message });
});



module.exports = app;

