var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importa o pacote cors
// Instância do HelperApp para ser usada em rotas que necessitam de autenticação e outras funções auxiliares que são utilizadas no app.js
const HelperApp = require("./Models/Helper/HelperApp");

var indexRouter = require('./routes/index');

var app = express();
// Habilita o CORS para todas as origens
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar rotas
app.use('/', indexRouter);

// Middleware de tratamento de erros
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

HelperApp.startBots();

module.exports = app;